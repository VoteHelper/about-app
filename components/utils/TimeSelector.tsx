import styled from "styled-components";
import { TIME_SELECTOR_END, TIME_SELECTOR_START } from "../../constants/study";
import { ITimeSelector } from "../../types/utils";
import TimeSelectorDual from "../atoms/TimeSelectorDual";

const TimeSelector = ({ times, setTimes }: ITimeSelector) => {

  const onChangeTimeStart = (startTime) => {
   
    setTimes({ start: startTime, end: null });
  };
  const onChangeTimeEnd = (endTime) => {
    setTimes({ start: null, end: endTime });
  };
  return (
    <Layout>
      <Container>
        <Name>시작 시간</Name>
        <TimeSelectorDual
          time={times.start}
          setTime={onChangeTimeStart}
          timeArr={TIME_SELECTOR_START}
        />
      </Container>
      <Container>
        <Name>종료 시간</Name>
        <TimeSelectorDual
          time={times.end}
          setTime={onChangeTimeEnd}
          timeArr={TIME_SELECTOR_END}
        />
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 12px;
`;

const Layout = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  justify-content: center;
`;

const Name = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: var(--font-h2);
  display: inline-block;
  margin-right: 12px;
`;

export default TimeSelector;
