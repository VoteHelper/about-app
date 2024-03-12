import { useRouter } from "next/router";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import SuccessScreen from "../../components/layout/SuccessScreen";
import { IFooterOptions, ModalLayout } from "../../components/modals/Modals";
import { GROUP_STUDY_ALL } from "../../constants/keys/queryKeys";
import { useResetQueryData } from "../../hooks/custom/CustomHooks";
import {
  useCompleteToast,
  useErrorToast,
} from "../../hooks/custom/CustomToast";
import { useGroupWritingMutation } from "../../hooks/groupStudy/mutations";

import { transferGroupDataState } from "../../recoil/transferDataAtoms";
import { ModalSubtitle } from "../../styles/layout/modal";
import { IGroup, IGroupWriting } from "../../types/page/group";
import { DispatchType, IModal } from "../../types/reactTypes";

interface IGroupConfirmModal extends IModal {
  groupWriting: IGroupWriting;
  setGroupWriting: DispatchType<IGroupWriting>;
}

function GroupConfirmModal({
  setIsModal,
  setGroupWriting,
  groupWriting,
}: IGroupConfirmModal) {
  const router = useRouter();
  const errorToast = useErrorToast();
  const completeToast = useCompleteToast();

  const [isSuccessScreen, setIsSuccessScreen] = useState(false);
  const setGroup = useSetRecoilState(transferGroupDataState);
  const resetQueryData = useResetQueryData();

  const { mutate } = useGroupWritingMutation("post", {
    onSuccess() {
      resetQueryData([GROUP_STUDY_ALL]);
      setGroup(null);
      setGroupWriting(null);
      setIsSuccessScreen(true);
    },
    onError: errorToast,
  });
  const { mutate: updateGroup } = useGroupWritingMutation("patch", {
    onSuccess() {
      setGroupWriting(null);
      setGroup(null);
      completeToast("free", "수정되었습니다.");
      resetQueryData([GROUP_STUDY_ALL], () => {
        router.push(`/group/${groupWriting.id}`);
      });
    },
    onError: errorToast,
  });

  const onSubmit = () => {
    if (groupWriting?.id) {
      updateGroup({ groupStudy: groupWriting as IGroup });
    } else mutate({ groupStudy: groupWriting });
  };

  const footerOptions: IFooterOptions = {
    main: {
      text: groupWriting?.id ? "내용 수정" : "소모임 개설",
      func: onSubmit,
    },
  };

  return (
    <>
      {groupWriting && (
        <ModalLayout
          title={groupWriting.id ? "내용 수정" : "소모임 개설"}
          setIsModal={setIsModal}
          footerOptions={footerOptions}
        >
          <ModalSubtitle>개설 내용을 확인해 주세요!</ModalSubtitle>
          <Container>
            <Item>
              <span>제목:</span>
              <span>{groupWriting?.title}</span>
            </Item>
            <Item>
              <span>날짜:</span>
              <span>{groupWriting?.category?.sub}</span>
            </Item>
            <Item>
              <span>주제:</span>
              <span>{groupWriting.guide}</span>
            </Item>
          </Container>
        </ModalLayout>
      )}
      {isSuccessScreen && (
        <SuccessScreen url={`/group`}>
          <>
            <span>소모임 개설 성공</span>
            <div>소모임 오픈 소식을 단톡방에 공유해 주세요!</div>
          </>
        </SuccessScreen>
      )}
    </>
  );
}

const Container = styled.div`
  line-height: 2;
  font-size: 13px;
  color: var(--gray-2);
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  > span:first-child {
    display: inline-block;
    width: 32px;
    font-weight: 600;
    margin-right: var(--gap-2);
  }
  > span:last-child {
    flex: 1;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default GroupConfirmModal;
