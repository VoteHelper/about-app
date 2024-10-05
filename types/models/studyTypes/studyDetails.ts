import { Dayjs } from "dayjs";

import { ActiveLocation } from "../../services/locationTypes";
import { IUserSummary, UserSimpleInfoProps } from "../userTypes/userInfoTypes";
import { IAbsence } from "./studyInterActions";

export interface IStudy {
  date: Date;
  participations: IParticipation[];
}

export interface IParticipation {
  place: IPlace;
  attendences: IAttendance[];
  absences: IAbsence[];
  startTime?: Date;
  status: StudyStatus;
}

export interface IAttendance {
  user: IUserSummary;
  time: {
    start: Dayjs;
    end: Dayjs;
  };
  createdAt: string;
  imageUrl?: string;
  arrived?: Date;
  firstChoice: boolean;
  memo: string;
}

export type StudyUserStatus = "pending" | "solo" | "open" | "completed";

export interface StudyAttendanceProps {
  user: UserSimpleInfoProps;
  place: {
    lat?: number;
    lon?: number;
    text: string;
  };
  status: StudyUserStatus;
  arrived?: string;
  image?: Blob | string;
  memo?: string;
  comment?: string;
  time: {
    start: string;
    end: string;
  };
}

export interface PlaceRegisterProps {
  fullname: string;
  brand: string;
  branch: string;
  image: string;
  longitude: number;
  latitude: number;
  location: ActiveLocation;
  coverImage: string;
  locationDetail: string;
  mapURL: string;
  time?: string;
}

export interface IPlace extends PlaceRegisterProps {
  status: string;
  _id: string;
  prefCnt: number;
  registerDate: string;
  myPrefer: boolean;
}

export type StudyStatus = "pending" | "open" | "dismissed" | "free";
