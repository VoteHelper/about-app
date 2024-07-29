import { Box, Button, Flex } from "@chakra-ui/react";
import dayjs from "dayjs";
import { Fragment, useEffect, useState } from "react";

import { useFeedCommentMutation, useFeedLikeMutation } from "../../hooks/feed/mutations";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { UserCommentProps } from "../../types/components/propTypes";
import { FeedComment } from "../../types/models/feed";
import { IUserSummary } from "../../types/models/userTypes/userInfoTypes";
import { dayjsToStr } from "../../utils/dateTimeUtils";
import RightDrawer from "../organisms/drawer/RightDrawer";
import ProfileCommentCard from "./cards/ProfileCommentCard";
import AvatarGroupsOverwrap from "./groups/AvatarGroupsOverwrap";
import UserComment from "./UserComment";
import UserCommentInput from "./UserCommentInput";

interface ContentHeartBarProps {
  feedId: string;
  likeUsers: IUserSummary[];
  likeCnt: number;
  comments: FeedComment[];
  refetch?: () => void;
}

function ContentHeartBar({ feedId, likeUsers, likeCnt, comments, refetch }: ContentHeartBarProps) {
  const { data: userInfo } = useUserInfoQuery();

  const [modalType, setModalType] = useState<"like" | "comment">(null);
  const [heartProps, setHeartProps] = useState({ isMine: false, users: likeUsers, cnt: likeCnt });
  const [commentArr, setCommentArr] = useState<UserCommentProps[]>(comments);

  const { mutate } = useFeedLikeMutation({
    onSuccess() {
      refetch();
    },
  });

  useEffect(() => {
    setCommentArr(comments);
  }, [comments]);

  const { mutate: writeComment } = useFeedCommentMutation(feedId);


  useEffect(() => {
    if (likeUsers?.some((who) => who.uid === userInfo?.uid)) {
      setHeartProps((old) => ({ ...old, isMine: true, users: likeUsers }));
    }
    if (likeCnt) {
      setHeartProps((old) => ({ ...old, cnt: likeCnt, users: likeUsers }));
    }
  }, [likeUsers, likeCnt, userInfo?.uid]);

  const resetCache = () => {
    refetch();
  };

  const onClickHeart = () => {
    setHeartProps((old) => {
      if (old.isMine) {
        return {
          isMine: false,
          cnt: old.cnt - 1,
          users: old.users.filter((who) => who.uid !== userInfo?.uid),
        };
      } else {
        return {
          isMine: true,
          cnt: old.cnt + 1,
          users: [userInfo, ...old.users],
        };
      }
    });

    mutate(feedId);
  };

  const userAvatarArr = heartProps?.users?.map((who) => ({
    avatar: who?.avatar,
    image: who.profileImage,
  }));

  const addNewComment = (user: IUserSummary, comment: string): UserCommentProps => {
    return {
      user,
      comment,
      createdAt: dayjsToStr(dayjs()),
    };
  };

  const onSubmit = async (value: string) => {
    await writeComment({ comment: value });
    setCommentArr((old) => [...old, addNewComment(userInfo, value)]);
  };

  return (
    <>
      <Flex align="center" pl="8px" pr="16px" pb="8px">
        <Button
          onClick={onClickHeart}
          size="sm"
          px="8px"
          variant="ghost"
          leftIcon={
            heartProps.isMine ? (
              <i className="fa-solid fa-heart fa-xl" style={{ color: "var(--color-red)" }} />
            ) : (
              <i className="fa-regular fa-heart fa-xl" />
            )
          }
        >
          {heartProps.cnt}
        </Button>
        <Button
          onClick={() => setModalType("comment")}
          size="sm"
          px="8px"
          variant="ghost"
          leftIcon={<i className="fa-regular fa-message fa-xl" />}
        >
          {commentArr.length}
        </Button>
        <Button size="sm" variant="ghost" mb="2px" onClick={() => setModalType("like")}>
          <AvatarGroupsOverwrap userAvatarArr={userAvatarArr} size="sm" />
        </Button>
      </Flex>
      {modalType === "like" && (
        <RightDrawer title="좋아요" onClose={() => setModalType(null)}>
          <Flex direction="column">
            {likeUsers.map((who, idx) => (
              <Fragment key={idx}>
                <ProfileCommentCard user={who} comment={who.comment} />
              </Fragment>
            ))}
          </Flex>
        </RightDrawer>
      )}
      {modalType === "comment" && (
        <RightDrawer title="댓글" onClose={() => setModalType(null)}>
          <Flex direction="column" px="16px" mt="8px">
            {commentArr.map((item, idx) => (
              <UserComment
                key={idx}
                type="gather"
                user={item.user}
                updatedAt={item.updatedAt}
                comment={item.comment}
                pageId={feedId}
                commentId="item._id"
                setCommentArr={setCommentArr}
                resetCache={resetCache}
              />
            ))}
          </Flex>
          <Box
            position="fixed"
            bottom="0"
            flex={1}
            w="100%"
            p="16px"
            borderTop="var(--border-main)dww"
          >
            <UserCommentInput user={userInfo} onSubmit={onSubmit} />
          </Box>
        </RightDrawer>
      )}
    </>
  );
}

export default ContentHeartBar;
