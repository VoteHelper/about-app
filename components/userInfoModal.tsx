import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Text, Spinner, Box, HStack, useToast, VStack, Badge, Divider, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { FC, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { isStranger, role, isMember, isPreviliged } from "../libs/authUtils";
import { IUser } from "../models/user";
import { UserAttendenceInfo } from "../models/userAttendenceInfo";
import ProfileImage from "./profileImage";
import SummaryAttendenceInfo from "./summaryAttendenceInfo";

const UserInfoModal: FC<{
  isOpen: boolean,
  onClose: () => void,
  userId: string,
  setActiveUserId?: (activeUser: string) => void,
}> = ({ isOpen, onClose, userId, setActiveUserId }) => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const [userAttendenceInfo, setUserAttendenceInfo] = useState<UserAttendenceInfo>(null)
  const {isLoading} = useQuery<UserAttendenceInfo, AxiosError>(
    'fetchUserInfo',
    async () => {
      const res = await axios.get(`/api/user/${userId}/info`)
      return res.data
    },
    {
      onSuccess: (data) => {
        setUserAttendenceInfo(data)
      },
      onError: (error) => {
        console.error(error)
        toast({
          title: '실패',
          description: '사용자 정보를 불러오는데 실패했어요',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        })
      }
    },
  )

  useEffect(() => {
    queryClient.invalidateQueries('fetchUserInfo')
  }, [userId])


  const cooperatorFrequency = userAttendenceInfo?.attendences
    ?.filter((a) => a.meetingTime !== '')
    ?.flatMap((a) => a.participants)
    ?.map((p) => p.user as IUser)
    ?.filter((u) => u.uid !== userId)
    ?.reduce((acc, curr) => (
      acc.get(curr) ? acc.set(curr, acc.get(curr)+1) : acc.set(curr, 1), acc
    ), new Map<IUser, number>()) || new Map()

  const cooperator = Array.from(cooperatorFrequency.keys())
    .sort((a, b) => cooperatorFrequency.get(a) - cooperatorFrequency.get(b))
    .slice(0, 3)

  return (
      <Modal size='xs' onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
            <ModalContent>
              <ModalHeader>사용자 정보</ModalHeader>
              <ModalBody>
                <HStack spacing={3} marginBottom='20px'>
                  <SkeletonCircle width='fit-content' height='fit-content' isLoaded={!isLoading}>
                    <ProfileImage
                      src={userAttendenceInfo?.user?.profileImage}
                      alt={userAttendenceInfo?.user?.name}
                      width='90px'
                    />
                  </SkeletonCircle>
                  <VStack alignItems='flex-start'>
                    <Skeleton isLoaded={!isLoading}>
                      <Text as='span' fontSize='2xl' fontWeight='400'>{userAttendenceInfo?.user?.name}</Text>
                    </Skeleton>
                    <Skeleton isLoaded={!isLoading}>
                      <HStack spacing={1}>
                        {
                          userAttendenceInfo && isStranger(userAttendenceInfo?.user?.role) && (
                            <Badge key='stranger' colorScheme='yellow'>{role.stranger}</Badge>
                          )
                        }
                        {
                          isMember(userAttendenceInfo?.user?.role) && (
                            <Badge key='member' colorScheme='green'>{role.member}</Badge>
                          )
                        }
                        {
                          isPreviliged(userAttendenceInfo?.user?.role) && (
                            <Badge key='previlied' colorScheme='red'>{role.previliged}</Badge>
                          )
                        }
                      </HStack>
                    </Skeleton>
                  </VStack>
                </HStack>
                <Divider />
                <Skeleton isLoaded={!isLoading}>
                  <SummaryAttendenceInfo attendences={userAttendenceInfo?.attendences} />
                </Skeleton>
                <Divider />
                <Box marginTop='5px'>
                  {
                    cooperator.length > 0 && (
                      <>
                        <Text as='span' fontSize='lg'>함께 참여한 친구: </Text>
                        <HStack spacing={1}>
                        {
                          cooperator.map((c) => (
                            <ProfileImage
                              key={c.uid}
                              src={c.thumbnailImage}
                              alt={c.name}
                              width='50px'
                              onClick={() => {
                                if (setActiveUserId)
                                  setActiveUserId(c.uid)
                              }}
                            />
                          ))
                        }
                        </HStack>
                      </>
                    )
                  }
                </Box>
              </ModalBody>
              <ModalFooter>
                <Button width='100%' onClick={onClose}>닫기</Button>
              </ModalFooter>
            </ModalContent>
      </Modal>
  )
}

export default UserInfoModal
