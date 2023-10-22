import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import {
  ModalBody,
  ModalFooterTwo,
  ModalLayout,
} from "../../components/modals/Modals";
import {
  useGatherCommentDeleteMutation,
  useGatherCommentEditMutation,
} from "../../hooks/gather/mutations";
import { IModal, IRefetch } from "../../types/reactTypes";

interface IGatherCommentEditModal extends IModal, IRefetch {
  commentText: string;
  commentId: string;
}

function GatherCommentEditModal({
  commentText,
  setIsModal,
  commentId,
  setIsRefetch,
}: IGatherCommentEditModal) {
  const router = useRouter();
  const gatherId = +router.query.id;

  const [isFirst, setIsFirst] = useState(true);
  const [value, setValue] = useState(commentText);

  const { mutate: deleteComment } = useGatherCommentDeleteMutation(gatherId);
  const { mutate: editComment } = useGatherCommentEditMutation(gatherId);

  const onComplete = () => {
    setIsRefetch(true);
    setIsModal(false);
  };

  const onDelete = () => {
    deleteComment(commentId);
    onComplete();
  };

  const onEdit = () => {
    editComment([commentId, value]);
    onComplete();
  };

  return (
    <>
      <ModalLayout onClose={() => setIsModal(false)} size="xs">
        <ModalBody>
          <Container>
            {isFirst ? (
              <>
                <button onClick={() => setIsFirst(false)}>수정하기</button>
                <button onClick={onDelete}>삭제하기</button>
              </>
            ) : (
              <>
                <Input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </>
            )}
          </Container>
        </ModalBody>
        {!isFirst && (
          <ModalFooterTwo
            leftText="취소"
            rightText="변경"
            onClickLeft={() => setIsModal(false)}
            onClickRight={onEdit}
          />
        )}
      </ModalLayout>
    </>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`;

const Input = styled.input`
  margin-top: var(--margin-md);
  padding: var(--padding-md);
  width: 100%;
  border: var(--border-main-light);
  border-radius: var(--border-radius-sub);
  font-size: 12px;
  :focus {
    outline: none;
    border: 2px solid var(--color-mint);
  }
`;

export default GatherCommentEditModal;
