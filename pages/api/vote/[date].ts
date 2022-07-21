import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { strToDate } from "../../../libs/dateUtils";
import dbConnect from "../../../libs/dbConnect";
import { AttendDTO } from "../../../models/interface/vote";
import { IPlace, Place } from "../../../models/place";
import { IUser } from "../../../models/user";
import { IAttendence, IParticipation, IVote, Vote } from "../../../models/vote";

const secret = process.env.NEXTAUTH_SECRET

const findOneVote = ( date: Date ) => (
  Vote.findOne({ date }).populate([
    'participations.place',
    'participations.attendences.user',
    'participations.invitations.user',
    'participations.absences.user',
  ])
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IVote>,
) {
  const { method } = req
  const dateStr = req.query.date as string
  const date = strToDate(dateStr).toDate()

  const token = await getToken({ req, secret })

  await dbConnect()

  let vote = await findOneVote(date)
  if (!vote) {
    const places = await Place.find({ status: 'active' })
    const participants = places.map((place) => {
      return {
        place: place._id,
        attendences: [],
        absences: [],
        invitations: [],
        status: 'pending',
      } as IParticipation
    })

    await Vote.create({
      date,
      participations: participants,
      regularMeeting: {
        enable: false,
      },
      agg: {
        invited: [],
        cancelled: [],
        voted: [],
      },
    })

    vote = await findOneVote(date)
  }

  const isAttending = vote.participations.flatMap((participation) => (
    participation.attendences.map((attendence) => (attendence.user as IUser)._id)
  ))
  .find((userId) => userId.toString() === token.id)

  const isInvited = vote.participations
    .flatMap((participation) => (
      participation.invitations.map((invitation) => (invitation.user as IUser)._id)
    ))
    .find((userId) => (userId.toString() === token.id))

  switch (method) {
    case 'GET':
      return res.status(200).json(vote)
    case 'POST':
      if (isAttending) {
        return res.status(200).json(vote)
      }
      const { place, start, end, anonymity, confirmed } = req.body as AttendDTO
      const attendence = { 
        time: { start, end }, 
        user: token.id,
        confirmed,
        anonymity, 
      } as IAttendence

      vote.participations = vote.participations.map((participation) => {
        const placeId = (participation.place as IPlace)._id.toString()
        if (placeId === place) {
          return {
            ...participation,
            attendences: [...participation.attendences, attendence],
          } 
        }
        return participation
      })
      await vote.save()

      return res.status(200).json(await findOneVote(date))
    case 'DELETE':
      if (!isAttending) {
        return res.status(200).json(vote)
      }
      break
  }

  return res.status(400).end()
}
