import { faCircleXmark, faClock } from "@fortawesome/pro-regular-svg-icons";
import { faBan } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import styled from "styled-components";

import { useRecoilValue } from "recoil";
import { useStudyCancelMutation } from "../../../hooks/study/mutations";
import {
  isVotingState,
  myStudyFixedState,
  studyDateStatusState,
} from "../../../recoil/studyAtoms";

import { useSession } from "next-auth/react";

import { useState } from "react";
import { POINT_SYSTEM_MINUS } from "../../../constants/pointSystem";
import { MAX_USER_PER_PLACE } from "../../../constants/study";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../../hooks/CustomToast";
import {
  usePointMutation,
  useScoreMutation,
} from "../../../hooks/user/pointSystem/mutation";
import { IStudySpaceData } from "../../../pages/about/[date]/[placeId]";
import { IUser } from "../../../types/user/user";
import StudySpaceNavModal from "./studySpaceNavModal";

interface IStudySpaceNavigation {
  studySpaceData: IStudySpaceData;
  voteCnt: number;
}

export type ModalType = "change" | "absent" | "main" | "cancel" | "free";

function StudySpaceNavigation({
  studySpaceData: { place, attendences, status, startTime },
  voteCnt,
}: IStudySpaceNavigation) {
  const router = useRouter();
  const failToast = useFailToast();
  const completeToast = useCompleteToast();
  const errorToast = useErrorToast();

  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";
  const voteDate = dayjs(router.query.date as string);

  const isVoting = useRecoilValue(isVotingState);
  const studyDateStatus = useRecoilValue(studyDateStatusState);
  const myStudyFixed = useRecoilValue(myStudyFixedState);

  const [modalType, setModalType] = useState("");

  const isMax = voteCnt >= MAX_USER_PER_PLACE;
  const myVote = attendences?.find(
    (props) => (props.user as IUser).uid === session?.uid
  );

  const { mutate: getScore } = useScoreMutation();
  const { mutate: getPoint } = usePointMutation();
  const { mutate: handleAbsent } = useStudyCancelMutation(voteDate, {
    onSuccess() {
      completeToast("success");
      router.push(`/about`);
    },
    onError: errorToast,
  });

  const onBtnClicked = (type: ModalType) => {
    if (isGuest) {
      failToast("guest");
      return;
    }
    if (type === "cancel") {
      if (myStudyFixed)
        failToast("free", "참여 확정 이후에는 당일 불참 버튼을 이용해주세요!");
      else {
        getScore(POINT_SYSTEM_MINUS.cancelStudy.score);
        getPoint(POINT_SYSTEM_MINUS.cancelStudy.point);
        handleAbsent();
      }
      return;
    }
    if (type === "change") {
      if (!myVote) {
        failToast("free", "스터디에 투표하지 않은 인원입니다.");
        return;
      }
    }
    if (type === "absent" && studyDateStatus === "not passed") {
      failToast("free", "스터디 시작 이후에만 사용이 가능합니다.");
      return;
    }
    setModalType(type);
  };

  return (
    <>
      {studyDateStatus === "today" && status === "dismissed" ? (
        <Layout>
          <MainButton func={true} onClick={() => onBtnClicked("free")}>
            Free 오픈 신청
          </MainButton>
        </Layout>
      ) : studyDateStatus === "passed" || status === "dismissed" ? (
        <Layout>
          <MainButton disabled={true} func={false}>
            기간 만료
          </MainButton>
        </Layout>
      ) : (
        <Layout>
          <SubNav>
            <Button onClick={() => onBtnClicked("cancel")}>
              <FontAwesomeIcon icon={faCircleXmark} size="xl" />
              <span>투표 취소</span>
            </Button>
            <Button onClick={() => onBtnClicked("change")}>
              <FontAwesomeIcon icon={faClock} size="xl" />
              <span>시간 변경</span>
            </Button>
            <Button onClick={() => onBtnClicked("absent")}>
              <FontAwesomeIcon icon={faBan} size="xl" />
              <span>당일 불참</span>
            </Button>
          </SubNav>
          {studyDateStatus === "today" ? (
            <MainButton
              disabled={Boolean(myVote?.arrived)}
              func={!myVote?.arrived}
              onClick={() => {
                onBtnClicked("main");
              }}
            >
              {myVote?.arrived
                ? "출석 완료"
                : myVote?.firstChoice
                ? "출석 체크"
                : "당일 참여"}
            </MainButton>
          ) : (
            <MainButton
              disabled={(isVoting || isMax) && true}
              func={!isVoting && !isMax}
              onClick={() => onBtnClicked("main")}
            >
              {isVoting
                ? "투표 완료"
                : isMax
                ? "정원 마감 (2지망 투표로만 가능)"
                : "스터디 투표"}
            </MainButton>
          )}
        </Layout>
      )}
      <StudySpaceNavModal
        type={modalType}
        setType={setModalType}
        myVote={myVote}
        place={place}
      />
    </>
  );
}

const Layout = styled.div`
  margin: 0 var(--margin-main);
  margin-top: var(--margin-main);
  padding: var(--padding-sub) 0;
  border-radius: var(--border-radius-main);
`;

const SubNav = styled.nav`
  display: flex;
  margin-bottom: var(--margin-max);
  justify-content: space-around;
`;

const Button = styled.button`
  align-items: center;
  color: var(--font-h2);
  width: 60px;
  height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > span {
    font-size: 13px;
  }
`;

const MainButton = styled.button<{ func?: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.func ? "var(--color-mint)" : "var(--font-h4)"};
  color: white;
  height: 48px;
  border-radius: 13px;
  padding: var(--padding-sub) 2px;
  font-weight: 700;
  font-size: 15px;
`;

export default StudySpaceNavigation;
