import styled from "styled-components";
import {
  getInterestingDate,
  getNextDate,
  getPreviousDate,
} from "../../libs/utils/dateUtils";
import { useRouter } from "next/router";
import { CenterDiv } from "../../styles/LayoutStyles";
import { useSetRecoilState } from "recoil";
import { attendingState, dateState } from "../../recoil/atoms";
import dayjs from "dayjs";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0 4vw;
  padding-top: 2.5vh;
  position: relative;

  > div {
    height: 100%;
    padding-top: 1.5%;
    position: absolute;
    font-size: 0.95em;
  }
`;
const YesterdayBtn = styled(CenterDiv)`
  left: calc(20% - 45px);
`;
const TomorrowdayBtn = styled(CenterDiv)`
  right: calc(20% - 45px);
`;

function AnotherDaysNav({ date }) {
  const router = useRouter();
  const yesterday = getPreviousDate(date);
  const tomorrow = getNextDate(date);
  const interestingDate = getInterestingDate();
  const setDateState = useSetRecoilState(dateState);
  const setAttending = useSetRecoilState(attendingState);

  const isAccessibleNextDay =
    tomorrow.unix() - interestingDate.add(2, "day").unix() <= 0;

  const [yesterdayLink, tommorrowLink] = [
    dayjs(yesterday).format("YYYY-MM-DD"),
    dayjs(tomorrow).format("YYYY-MM-DD"),
  ].map((dateStr) => {
    return `/vote/${dateStr}`;
  });

  const moveYesterday = () => {
    setDateState((day) => dayjs(day).subtract(1, "day"));
    setAttending(-1);
  };
  const moveTomorrow = () => {
    setDateState((day) => dayjs(day).add(1, "day"));
    setAttending(-1);
  };

  return (
    <Container>
      <YesterdayBtn onClick={moveYesterday}>Yesterday</YesterdayBtn>
      <TomorrowdayBtn onClick={moveTomorrow}>Tomorrow</TomorrowdayBtn>
    </Container>
  );
}

export default AnotherDaysNav;
