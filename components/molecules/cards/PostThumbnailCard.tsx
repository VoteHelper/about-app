import { Box, Flex } from "@chakra-ui/react";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { STUDY_PREFERENCE_LOCAL } from "../../../constants/keys/queryKeys";
import { useToast } from "../../../hooks/custom/CustomToast";
import { useStudyPreferenceMutation } from "../../../hooks/study/mutations";
import { SingleLineText } from "../../../styles/layout/components";
import { IImageProps } from "../../../types/components/assetTypes";
import { ITextAndColorSchemes } from "../../../types/components/propTypes";
import { IStudyVotePlaces } from "../../../types/models/studyTypes/studyInterActions";
import { IUserSummary } from "../../../types/models/userTypes/userInfoTypes";
import { dayjsToFormat } from "../../../utils/dateTimeUtils";
import OutlineBadge from "../../atoms/badges/OutlineBadge";
import Skeleton from "../../atoms/skeleton/Skeleton";
import AvatarGroupsOverwrap from "../groups/AvatarGroupsOverwrap";
export interface IPostThumbnailCard {
  participants?: IUserSummary[];
  title: string;
  subtitle: string;
  image: IImageProps;
  url: string;
  badge: ITextAndColorSchemes;
  type: "study" | "gather";
  statusText?: string;
  maxCnt?: number;
  func?: () => void;
  registerDate?: string;
  isPreferPlace?: boolean;
  id?: string;
}

interface IPostThumbnailCardObj {
  postThumbnailCardProps: IPostThumbnailCard;
}
export function PostThumbnailCard({
  postThumbnailCardProps: {
    participants,
    title,
    subtitle,
    image,
    url,
    badge,
    statusText = undefined,
    maxCnt = undefined,
    func = undefined,
    type,
    registerDate,
    isPreferPlace,
    id,
  },
}: IPostThumbnailCardObj) {
  const toast = useToast();

  const userAvatarArr = participants
    ?.filter((par) => par)
    .map((par) => ({
      image: par.profileImage,
      ...(par.avatar?.type !== null ? { avatar: par.avatar } : {}),
    }));

  const CLOSED_TEXT_ARR = ["모집 마감", "닫힘"];

  const [isHeart, setIsHeart] = useState(isPreferPlace);

  useEffect(() => {
    setIsHeart(isPreferPlace);
  }, [isPreferPlace]);

  const { mutate: setStudyPreference } = useStudyPreferenceMutation({
    onSuccess() {
      toast("success", "변경되었습니다.");
    },
  });

  const toggleHeart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const preferenceStorage = localStorage.getItem(STUDY_PREFERENCE_LOCAL);
    const savedPrefer = JSON.parse(preferenceStorage) as IStudyVotePlaces;

    const newPrefer: IStudyVotePlaces = {
      place: savedPrefer?.place,
      subPlace: savedPrefer?.subPlace || [],
    };
    if (isHeart) {
      if (savedPrefer.place === id) {
        newPrefer.place = savedPrefer.subPlace?.[0];
        newPrefer.subPlace = savedPrefer.subPlace.filter((sub) => sub !== newPrefer.place);
      } else {
        newPrefer.subPlace = savedPrefer.subPlace.filter((sub) => sub !== id);
      }
    } else {
      if (newPrefer?.place) {
        newPrefer.subPlace = [...savedPrefer.subPlace, id];
      } else {
        newPrefer.place = id;
      }
    }
    setIsHeart((old) => !old);

    localStorage.setItem(STUDY_PREFERENCE_LOCAL, JSON.stringify(newPrefer as IStudyVotePlaces));

    setStudyPreference(newPrefer);
  };

  return (
    <CardLink href={url} onClick={func}>
      <Flex flex={1}>
        <Box
          w="80px"
          h="80px"
          borderRadius="var(--rounded-lg)"
          position="relative"
          overflow="hidden"
          pos="relative"
        >
          <Image
            src={image.url}
            alt="thumbnailImage"
            fill={true}
            sizes="100px"
            priority={image.priority}
          />
          {type === "study" && (
            <Box
              as="button"
              pos="absolute"
              p={1}
              bottom={-1}
              right={1}
              color="white"
              onClick={toggleHeart}
            >
              {isHeart ? (
                <i className="fa-solid fa-heart fa-sm" />
              ) : (
                <i className="fa-regular fa-heart fa-sm" />
              )}
            </Box>
          )}
        </Box>
        <Flex direction="column" ml="12px" flex={1}>
          <Flex align="center" fontSize="16px">
            {title !== "개인 스터디" && type === "study" && (
              <Flex mr="4px" w="12px" justify="center" align="center">
                <Box>
                  <i className="fa-regular fa-location-dot fa-sm" />
                </Box>
              </Flex>
            )}
            <Title>{title}</Title>
          </Flex>
          <Subtitle>{subtitle}</Subtitle>
          {participants ? (
            <StatusContainer>
              <AvatarGroupsOverwrap userAvatarArr={userAvatarArr} />
              <div className="statusText">
                <Box fontSize="14px" color="var(--color-mint)" fontWeight={600} mr="8px" mt="4px">
                  {statusText}
                </Box>
              </div>
            </StatusContainer>
          ) : (
            <Flex mt="auto" color="var(--gray-500)">
              <Box>등록일: </Box>
              <Box>{dayjsToFormat(dayjs(registerDate), "YYYY년 M월 D일")}</Box>
            </Flex>
          )}
        </Flex>
      </Flex>
      <Flex direction="column" justifyContent="space-between" align="flex-end">
        <Box>
          {badge && <OutlineBadge size="sm" text={badge.text} colorScheme={badge.colorScheme} />}
        </Box>
        {participants && (
          <Flex
            mb="-2px"
            className="userIconContainer"
            fontSize="15px"
            align="center"
            color="var(--gray-500)"
          >
            <Box>
              <i className="fa-regular fa-user fa-xs" />
            </Box>
            <Flex ml="8px" align="center" fontWeight={500}>
              <Box
                as="span"
                color={
                  CLOSED_TEXT_ARR.includes(badge?.text)
                    ? "inherit"
                    : maxCnt && participants.length >= maxCnt
                      ? "var(--color-red)"
                      : "var(--gray-800)"
                }
              >
                {participants.length}
              </Box>
              <Box>
                <Box as="span" mr="2px" ml="4px">
                  /
                </Box>
                {maxCnt || <i className="fa-regular fa-infinity" />}
              </Box>
            </Flex>
          </Flex>
        )}
      </Flex>
    </CardLink>
  );
}

export function PostThumbnailCardSkeleton() {
  return (
    <SkeletonContainer>
      <SkeletonBlock style={{ width: "80px", height: "80px" }}>
        <Skeleton>t</Skeleton>
      </SkeletonBlock>
      <ContentContainer>
        <TitleHeader style={{ marginBottom: "4px" }}>
          <Box w="60px">
            <Skeleton>temp</Skeleton>
          </Box>
          <Box w="60px">
            <Skeleton>temp</Skeleton>
          </Box>
        </TitleHeader>
        <Box w="50px" h="16px">
          <Skeleton>temp</Skeleton>
        </Box>
      </ContentContainer>
    </SkeletonContainer>
  );
}

const CardLink = styled(Link)`
  height: 112px;
  display: flex;
  padding: 16px;
  background-color: white;
  border: var(--border);
  border-radius: var(--rounded-lg);
  justify-content: space-between;

  &:hover {
    background-color: var(--gray-200);
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  margin-left: 12px;
`;

const TitleHeader = styled.div`
  height: 20px;
  display: flex;
  justify-content: space-between;
`;

const Title = styled(SingleLineText)`
  font-weight: 600;
`;

const Subtitle = styled(SingleLineText)`
  color: var(--gray-500);
  font-size: 12px;
  width: 90%;
  font-weight: 500;
`;

const StatusContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  margin-bottom: -2px;
  .statusText {
    display: flex;
    margin-left: auto;
    align-items: center;
    color: var(--gray-600); // text-gray-500
    .userIconContainer {
      display: flex;
      align-items: center;
      letter-spacing: 2px;
      > svg {
        margin-bottom: 2px;
      }
      > span:last-child {
        margin-left: 6px;
      }
    }
  }
`;

const SkeletonContainer = styled.div`
  height: 112px;
  display: flex;
  padding: 16px;
  background-color: white;
  border: var(--border);
  border-radius: var(--rounded-lg);

  &:hover {
    background-color: var(--gray-200); // gray-100
  }
`;

const SkeletonBlock = styled.div`
  background-color: var(--gray-200); // gray-200 대응
  border-radius: var(--rounded-lg);
`;
