import dayjs from "dayjs";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import TimeSelector from "../../components/utils/TimeSelector";
import { useStudyTimeChangeMutation } from "../../hooks/study/mutations";
import { studyStartTimeState, voteDateState } from "../../recoil/studyAtoms";
import {
  ModalFooterNav,
  ModalHeaderLine,
  ModalMain,
} from "../../styles/layout/modal";

import { ModalLayout } from "../../components/common/modal/Modals";
import { useCompleteToast, useFailToast } from "../../hooks/ui/CustomToast";
import { usePointMutation } from "../../hooks/user/pointSystem/mutation";
import { isRefetchStudySpacelState } from "../../recoil/refetchingAtoms";
import { IModal } from "../../types/common";
import { ITimeStartToEnd, ITimeStartToEndHM } from "../../types/utils";

interface IStudyChangeTimeModal extends IModal {
  myVoteTime: ITimeStartToEnd;
}

const HOUR_TO_MINUTE = 60;

function StudyChangeTimeModal({
  setIsModal,
  myVoteTime,
}: IStudyChangeTimeModal) {
  const completeToast = useCompleteToast();
  const failToast = useFailToast();

  const voteDate = useRecoilValue(voteDateState);
  const studyStartTime = useRecoilValue(studyStartTimeState);
  const setIsRefetch = useSetRecoilState(isRefetchStudySpacelState);

  const { mutate: getPoint } = usePointMutation();

  const startTime = dayjs(myVoteTime.start);
  const endTime = dayjs(myVoteTime.end);

  const [time, setTime] = useState<ITimeStartToEndHM>({
    start: {
      hours: startTime.hour(),
      minutes: startTime.minute(),
    },
    end: { hours: endTime.hour(), minutes: endTime.minute() },
  });

  const { mutate: patchAttend } = useStudyTimeChangeMutation(voteDate, {
    onSuccess() {
      if (
        dayjs().hour() * HOUR_TO_MINUTE + dayjs().minute() >=
        time.start.hours * HOUR_TO_MINUTE + time.start.minutes
      )
        getPoint({ value: -5, message: "늦은 시간 변경" });
      else if (dayjs() > studyStartTime)
        getPoint({ value: -2, message: "늦은 시간 변경" });
      setIsRefetch(true);
      completeToast("success");
    },
    onError(err) {
      console.error(err);
      failToast("error");
    },
  });

  const onSubmit = () => {
    const start = time.start;
    const end = time.end;
    const timeInfo = {
      start: dayjs(voteDate.hour(start.hours).minute(start.minutes)),
      end: dayjs(voteDate.hour(end.hours).minute(end.minutes)),
    };

    if (
      start.hours * HOUR_TO_MINUTE + start.minutes >=
      end.hours * HOUR_TO_MINUTE + end.minutes
    ) {
      failToast("free", "시작시간은 종료시간 이전이어야 합니다.");
      return;
    }

    setIsModal(false);
    patchAttend(timeInfo);
  };

  return (
    <ModalLayout size="md">
      <ModalHeaderLine>시간변경</ModalHeaderLine>
      <ModalMain>
        <Wrapper>
          <TimeSelector
            setTimes={({ start, end }: ITimeStartToEndHM) => {
              if (start) setTime({ ...time, start });
              if (end) setTime({ ...time, end });
            }}
            times={time}
          />
        </Wrapper>
        {studyStartTime && dayjs() > studyStartTime && (
          <WaringMsg>스터디 시작 이후의 시간 변경은 -5점을 받습니다.</WaringMsg>
        )}
      </ModalMain>
      <ModalFooterNav>
        <button onClick={() => setIsModal(false)}>취소</button>
        <button onClick={onSubmit}>변경</button>
      </ModalFooterNav>
    </ModalLayout>
  );
}

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const WaringMsg = styled.span`
  font-size: 12px;
  color: var(--color-red);
`;

export default StudyChangeTimeModal;
