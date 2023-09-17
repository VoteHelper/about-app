import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ModalHeaderX } from "../../../components/common/modal/ModalComponents";
import { ModalLayout } from "../../../components/common/modal/Modals";
import { POINT_SYSTEM_PLUS } from "../../../constants/pointSystem";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../../hooks/CustomToast";
import { useStudyParticipateMutation } from "../../../hooks/study/mutations";
import {
  usePointMutation,
  useScoreMutation,
} from "../../../hooks/user/pointSystem/mutation";
import { isRefetchStudyState } from "../../../recoil/refetchingAtoms";
import {
  isVotingState,
  participationsState,
  studyDateStatusState,
  voteDateState,
} from "../../../recoil/studyAtoms";
import { IModal } from "../../../types/reactTypes";
import { IStudyParticipate } from "../../../types/study/studyUserAction";
import StudyVoteMainModalPlace from "./StudyVoteMainModalPlace";
import StudyVoteMainModalTime from "./StudyVoteMainModalTime";

function StudyVoteMainModal({ setIsModal }: IModal) {
  const failToast = useFailToast();
  const errorToast = useErrorToast();
  const completeToast = useCompleteToast();

  const participations = useRecoilValue(participationsState);
  const voteDate = useRecoilValue(voteDateState);
  const isVoting = useRecoilValue(isVotingState);
  const studyDateStatus = useRecoilValue(studyDateStatusState);
  const setUpdateStudy = useSetRecoilState(isRefetchStudyState);

  const [page, setPage] = useState(0);
  const [voteInfo, setVoteInfo] = useState<IStudyParticipate>();

  const { mutate: getPoint } = usePointMutation();
  const { mutate: getScore } = useScoreMutation();

  const placeCnt = participations?.length;
  const modalSize = placeCnt > 6 ? "xl" : placeCnt > 4 ? "lg" : "md";

  const { mutate: patchAttend } = useStudyParticipateMutation(voteDate, {
    onSuccess: () => {
      if (!isVoting) {
        if (studyDateStatus === "today") {
          getScore(POINT_SYSTEM_PLUS.voteStudyDaily.score);
          getPoint(POINT_SYSTEM_PLUS.voteStudyDaily.point);
        }
        if (studyDateStatus === "not passed") {
          getScore(POINT_SYSTEM_PLUS.voteStudy.score);
          getPoint(POINT_SYSTEM_PLUS.voteStudy.point);
        }
      }
      setUpdateStudy(true);
      completeToast("studyVote");
    },
    onError: errorToast,
  });

  const onSubmit = () => {
    const startTime = voteInfo?.start;
    const endTime = voteInfo?.end;

    if (!startTime || !endTime) {
      failToast("free", "시작 시간과 종료 시간을 모두 선택해 주세요!");
      return;
    }
    if (startTime > endTime) {
      failToast("free", "시작 시작은 종료 시간 이전이어야 합니다.");
      return;
    }
    patchAttend(voteInfo);
    setIsModal(false);
  };

  return (
    <>
      <ModalLayout size={modalSize} height={modalSize === "lg" && 320}>
        <ModalHeaderX
          title={voteDate.format("M월 D일 스터디 투표")}
          setIsModal={setIsModal}
        />
        {page === 0 || page === 1 ? (
          <StudyVoteMainModalPlace
            setVoteInfo={setVoteInfo}
            page={page}
            setPage={setPage}
            participations={participations}
            isBig={modalSize !== "md"}
          />
        ) : (
          <StudyVoteMainModalTime
            setVoteInfo={setVoteInfo}
            onSubmit={onSubmit}
            isTimeBoard={modalSize !== "md"}
            setPage={setPage}
          />
        )}
      </ModalLayout>
    </>
  );
}

export default StudyVoteMainModal;
