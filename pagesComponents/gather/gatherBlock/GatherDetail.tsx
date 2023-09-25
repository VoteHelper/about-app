import { faCalendarDay, faUserCheck } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs, { Dayjs } from "dayjs";
import styled from "styled-components";

interface IGatherDetail {
  age: number[];
  date: Dayjs | string;
}

function GatherDetail({ age, date }: IGatherDetail) {
  return (
    <Layout>
      <Condition>
        <FontAwesomeIcon icon={faUserCheck} color="var(--font-h4)" />
        <span>
          {age[0]}~{age[1]}세
        </span>
      </Condition>
      <Date>
        <FontAwesomeIcon icon={faCalendarDay} color="var(--font-h4)" />
        <span>{date === "미정" ? date : dayjs(date).format("M월 DD일")}</span>
      </Date>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  line-height: 2;
`;
const Condition = styled.div`
  > span {
    margin-left: var(--margin-md);
  }
`;
const Date = styled.div`
  > span {
    margin-left: var(--margin-sub);
  }
`;
export default GatherDetail;
