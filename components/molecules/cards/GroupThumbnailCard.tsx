import { Badge, Box, Flex } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";
import styled from "styled-components";

import { ABOUT_USER_SUMMARY } from "../../../constants/serviceConstants/userConstants";
import { SingleLineText } from "../../../styles/layout/components";
import {
  GroupParicipantProps,
  GroupStatus,
  IGroupWritingCategory,
} from "../../../types/models/groupTypes/group";
import { IUserSummary } from "../../../types/models/userTypes/userInfoTypes";
import { UserIcon } from "../../Icons/UserIcons";
import AvatarGroupsOverwrap from "../groups/AvatarGroupsOverwrap";

const VOTER_SHOW_MAX = 4;
export interface GroupThumbnailCardProps {
  title: string;
  text: string;
  status: GroupStatus;
  category: IGroupWritingCategory;
  participants: (GroupParicipantProps | { user: IUserSummary })[];
  imageProps: {
    image: string;
    isPriority?: boolean;
  };
  maxCnt: number;
  func: () => void;
  id: number;
  waitingCnt?: number;
  isBig?: boolean;
  isBottomBorder?: boolean;
}

export function GroupThumbnailCard({
  participants,
  title,
  status,
  text,
  category,
  func,
  imageProps,
  id,
  maxCnt,
  waitingCnt,
  isBig = true,
  isBottomBorder = true,
}: GroupThumbnailCardProps) {
  const userAvatarArr = participants
    ?.filter((par) => par)
    .map((par) =>
      par.user
        ? {
            image: par.user?.profileImage,
            ...(par.user.avatar?.type !== null ? { avatar: par.user.avatar } : {}),
          }
        : { image: ABOUT_USER_SUMMARY.profileImage },
    );

  const statusToBadgeProps: Record<GroupStatus, { text: string; colorScheme: string }> = {
    imminent: { text: `마감까지 ${maxCnt - participants.length}명`, colorScheme: "red" },
    full: { text: "인원마감", colorScheme: "orange" },
    pending: { text: "모집중", colorScheme: "mint" },
    end: { text: "종료됨", colorScheme: "blue" },
    planned: { text: "오픈 예정", colorScheme: "purple" },
  };

  return (
    <CardLink href={`/group/${id}`} onClick={func}>
      <PlaceImage src={imageProps.image} priority={imageProps.isPriority} />
      <Flex direction="column" ml="12px" flex={1}>
        <Flex my={1} justify="space-between" align="center">
          <Box fontSize="11px" lineHeight="12px">
            <Box as="span" fontWeight="medium" lineHeight="12px" color="mint">
              {category?.main}
            </Box>
            <Box as="span" fontWeight="regular" color="var(--gray-400)">
              ・
            </Box>
            <Box as="span" color="gray.500" fontWeight="regular">
              {category?.sub}
            </Box>
          </Box>
          <Badge mr={1} size="lg" colorScheme={statusToBadgeProps[status].colorScheme}>
            {status === "pending" && category.main === "콘텐츠"
              ? "진행중"
              : statusToBadgeProps[status].text}
          </Badge>
        </Flex>
        <Title isBig={isBig}>{title}</Title>
        <Subtitle lineNum={2}>{text}</Subtitle>
        {waitingCnt === null ? (
          <Flex alignItems="center" justify="space-between">
            <AvatarGroupsOverwrap userAvatarArr={userAvatarArr} maxCnt={VOTER_SHOW_MAX} />
            <Flex align="center" color="var(--gray-500)">
              <UserIcon size="sm" />
              <Flex ml={1} fontSize="10px" align="center" fontWeight={500}>
                <Box
                  fontWeight={600}
                  as="span"
                  color={
                    maxCnt !== 0 && participants.length >= maxCnt
                      ? "var(--color-red)"
                      : "var(--color-gray)"
                  }
                >
                  {participants.length}
                </Box>
                <Box as="span" color="var(--gray-400)" mx="2px" fontWeight={300}>
                  /
                </Box>
                <Box as="span" color="var(--gray-500)" fontWeight={500}>
                  {maxCnt === 0 ? <i className="fa-regular fa-infinity" /> : maxCnt}
                </Box>
              </Flex>
            </Flex>
          </Flex>
        ) : category.main !== "콘텐츠" ? (
          <Box ml="auto" mr={1} h={4} fontSize="11px" color="purple" fontWeight="semibold">
            {waitingCnt + 7}명의 멤버가 오픈을 기다리고 있어요
          </Box>
        ) : null}
      </Flex>
    </CardLink>
  );
}

type PlaceImageProps = Omit<ComponentProps<typeof Image>, "alt" | "sizes" | "fill">;

function PlaceImage(props: PlaceImageProps) {
  return (
    <Box
      aspectRatio={1 / 1}
      borderRadius="var(--rounded-lg)"
      position="relative"
      overflow="hidden"
      pos="relative"
      w="98px"
      h="98px"
      border="var(--border)"
      bg="gray.100"
    >
      <Image
        {...props}
        alt="thumbnailImage"
        sizes="98px"
        fill
        style={{
          objectFit: "cover",
        }}
      />
    </Box>
  );
}

const CardLink = styled(Link)`
  height: fit-content;
  display: flex;

  border-radius: 12px;
  background-color: white;
  justify-content: space-between;

  &:hover {
    background-color: var(--gray-200);
  }

  &:not(:last-of-type) {
    padding-bottom: 12px;
    border-bottom: var(--border);
    margin-bottom: 16px;
  }
`;

const Title = styled(SingleLineText)<{ isBig: boolean }>`
  font-weight: 700;
  font-size: ${(props) => (props.isBig ? "16px" : "14px")};
  margin-bottom: 4px;
  line-height: 24px;
  color: var(--gray-800);
`;

const Subtitle = styled(SingleLineText)`
  color: var(--gray-500);
  font-size: 12px;
  font-weight: regular;
  line-height: 18px;
  margin-bottom: 12px;
`;
