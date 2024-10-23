import { Box, Button, Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";

import { ModalLayout } from "../../../modals/Modals";
import { MessageSimpleProps } from "../../../types/models/commonTypes";
import { IUserSummary, UserSimpleInfoProps } from "../../../types/models/userTypes/userInfoTypes";
import Avatar from "../../atoms/Avatar";
import UserBadge from "../../atoms/badges/UserBadge";
import BasicAvatar from "../../atoms/BasicAvatar";
import Textarea from "../../atoms/Textarea";
import { ChatTalkIcon } from "../../Icons/chatIcons";

export interface IProfileCommentCard {
  user: UserSimpleInfoProps | IUserSummary;
  memo?: string;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  hasCommentButton?: boolean;
  comment?: MessageSimpleProps;
  changeComment?: (comment: string) => void;
}

export default function ProfileCommentCard({
  user,
  memo,
  leftComponent,
  rightComponent,
  changeComment,
  hasCommentButton,
  comment,
}: IProfileCommentCard) {
  const { data: session } = useSession();
  const [isCommentModal, setIsCommentModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(comment?.text || "");

  const changeText = () => {
    changeComment(text);
    setIsEdit(false);
    setIsCommentModal(false);
  };

  const closeModal = () => {
    setIsCommentModal(false);
    setIsEdit(false);
  };
  console.log(rightComponent);
  return (
    <>
      <Flex py={3} align="center">
        {leftComponent && <Box mr="16px">{leftComponent}</Box>}
        {user ? (
          <Avatar image={user.profileImage} size="md" avatar={user.avatar} uid={user.uid} />
        ) : (
          <BasicAvatar />
        )}
        <Flex direction="column" justify="center" ml={3} my={1}>
          <Flex align="center" mb={memo ? 1 : 0}>
            <Box lineHeight="20px" mr={1} fontWeight="semibold" fontSize="13px">
              {user?.name}
            </Box>
            <UserBadge score={user?.score || 0} uid={user?.uid} />
            {hasCommentButton && (
              <Button ml={1} variant="unstyled" onClick={() => setIsCommentModal(true)}>
                <ChatTalkIcon isActive={!!comment} />
              </Button>
            )}
          </Flex>
          <Flex lineHeight="18px" alignItems="center" color="gray.500" fontSize="12px">
            <CommentText>{memo}</CommentText>
          </Flex>
        </Flex>
        <RightComponentContainer>{rightComponent}</RightComponentContainer>
      </Flex>
      {isCommentModal && (
        <ModalLayout
          footerOptions={{
            main: {
              text: isEdit ? "변경" : "확인",
              func: isEdit ? changeText : closeModal,
            },
            ...(isEdit && { sub: { func: closeModal } }),
            isFull: false,
          }}
          setIsModal={setIsCommentModal}
          title={`${user.name}님의 한줄 코멘트`}
        >
          {!isEdit ? (
            <Box
              border="var(--border)"
              textAlign="start"
              p={2}
              borderRadius="12px"
              w="full"
              h="full"
              color="gray.500"
            >
              {comment?.text || "미작성"}
              {user.uid === session?.user.uid && (
                <Button ml={2} variant="unstyled" color="mint" onClick={() => setIsEdit(true)}>
                  <i className="fa-solid fa-pen-to-square fa-sm" />
                </Button>
              )}
            </Box>
          ) : (
            <Textarea defaultValue={comment?.text} onChange={(e) => setText(e.target.value)} />
          )}
        </ModalLayout>
      )}
    </>
  );
}

const CommentText = styled.span`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: var(--gray-500);
  font-size: 12px;
  line-height: 18px;
`;

const RightComponentContainer = styled.div`
  margin-left: auto;
`;
