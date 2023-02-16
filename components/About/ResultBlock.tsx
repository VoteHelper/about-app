import styled from "styled-components";
import Image from "next/image";

import { useState, useEffect } from "react";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  isShowVoteCancleState,
  isUserAttendState,
  ShowOpenResultState,
  showVoterState,
  voteStatusState,
} from "../../recoil/atoms";

import { IPlace } from "../../models/place";
import { IUser } from "../../models/user";
import { IParticipation } from "../../models/vote";

import { useSession } from "next-auth/react";
import VoterModal from "../../modals/VoterModal";

const ResultBlockLayout = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 10px rgb(0, 0, 0, 0.15);
  height: 90px;
  border-radius: 1.3vh;
  margin: 2px;
  margin-bottom: 10px;
  padding-left: 4px;
`;

const ResultBlockHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40%;
  > span {
    font-family: "NanumEx";
    font-size: 1.1em;
    display: inline-block;
    color: rgb(0, 0, 0, 0.7);
  }
`;

const ResultBlockNav = styled.nav`
  margin-right: 10px;
  display: flex;
  > button {
    font-family: "apple-system";
    font-weight: 600;
    font-size: 0.7em;
    width: 52px;
    height: 16px;
    margin-left: 6px;
    border-radius: 10px;
  }
`;

interface ICancelBtn {
  status: boolean;
}
const CancelBtn = styled.button<ICancelBtn>`
  display: ${(props) => (props.status ? "inline-block" : "none")};
  background-color: #fc8181;
  color: #822727;
`;

const VoterBtn = styled.button`
  background-color: #ffc72c;
  color: #2c3e50;
`;

interface IResultStatus {
  open: boolean;
}

const ResultStatus = styled.button<IResultStatus>`
  background: ${(props) => (props.open ? "#68D391" : "#d3d3d3")};
  color: ${(props) => (props.open ? "rgb(34,84,61)" : "rgb(0,0,0,0.7)")};
`;

const ResultChart = styled.div`
  display: flex;
  flex-direction: row;
  height: 60%;
  padding: 3px 0;
  > div {
    background-color: RGB(159, 89, 26, 0.1);
  }
  > div:first-child {
    margin-right: 3px;
    width: 48px;
    border-radius: 8px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ChartView = styled.div`
  padding-left: 3px;
  margin-right: 5px;
  border-radius: 1.5vw;
  display: flex;
  align-items: center;
  flex: 1;
`;

interface IBox {
  voteState: String;
}
const Box = styled.div<IBox>`
  background-color: ${(props) =>
    props.voteState === "attend" ? "RGB(125, 70, 20, 0.9)" : "#d3d3d3"};
  width: 40px;
  height: 40px;
  border-radius: 6px;
  margin-right: 1px;
`;

interface IResultBlock extends IParticipation {
  index: Number;
}

function ResultBlock({
  place,
  attendences,
  absences,
  index,
  status,
}: IResultBlock) {
  const { data: session } = useSession();

  const setIsShowVoteCancle = useSetRecoilState(isShowVoteCancleState);
  const setShowVoter = useSetRecoilState(showVoterState);
  const setShowOpenResult = useSetRecoilState(ShowOpenResultState);
  const [isUserAttend, setIsUserAttend] = useRecoilState(isUserAttendState);
  const open = status === "open" ? true : false;
  const [isShowVoter, setIsShowVoter] = useState(false);
  const countArr = [];
  let cnt = 0;

  for (let i = 0; i < attendences.length; i++) {
    if (attendences[i].firstChoice) cnt++;
  }
  for (let i = 0; i < cnt + absences.length; i++) {
    if (i < attendences.length) countArr.push("attend");
    else countArr.push("absence");
  }

  return (
    <>
      <ResultBlockLayout>
        <ResultBlockHeader>
          <span>{place.fullname}</span>
          <ResultBlockNav>
            {isUserAttend && open && (
              <CancelBtn
                onClick={() => setIsShowVoteCancle(true)}
                status={Boolean(isUserAttend)}
              >
                Cancel
              </CancelBtn>
            )}
            <VoterBtn onClick={() => setIsShowVoter(true)}>Voter</VoterBtn>
            <ResultStatus
              open={open}
              onClick={open ? () => setShowOpenResult(index) : null}
            >
              {open ? "Open" : status === "dismissed" ? "Closed" : "Voting..."}
            </ResultStatus>
          </ResultBlockNav>
        </ResultBlockHeader>
        <ResultChart>
          <div>
            <Image
              src={place.image}
              alt="about"
              width={44}
              height={44}
              style={{ borderRadius: "6px" }}
            />
          </div>
          <ChartView>
            {countArr.map((item, idx) => (
              <Box key={idx} voteState={item} />
            ))}
          </ChartView>
        </ResultChart>
      </ResultBlockLayout>
      {isShowVoter && (
        <VoterModal attendences={attendences} setIsShowVoter={setIsShowVoter} />
      )}
    </>
  );
}
export default ResultBlock;
