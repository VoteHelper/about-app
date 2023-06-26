import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { UseQueryResult } from "react-query";
import styled from "styled-components";
import { CHART_MONTH_RANGE, MONTH_LIST } from "../../constants/range";
import {
  useAttendRateQueries,
  useVoteRateQueries,
} from "../../hooks/user/queries";
import { getMonth } from "../../libs/utils/dateUtils";
import { IVoteRate } from "../../types/studyRecord";
import { IUser } from "../../types/user";

interface IAttendChart {
  type?: string;
  user?: IUser;
}

function AttendChart({ type, user }: IAttendChart) {
  const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
  const { data: session } = useSession();
  const Uid = type === "main" ? session?.uid : user?.uid;
  const text = type === "modal" ? undefined : "내 스터디 참여";
  const monthXaxis = [];
  for (let i = Number(getMonth()) - 2; i <= Number(getMonth()) + 1; i++)
    monthXaxis.push(MONTH_LIST[i]);

  const [isLoading, setIsLoading] = useState(true);
  const [voteAverageArr, setVoteAverageArr] = useState([]);
  const [myAttendCountTotal, setMyAttendCountTotal] = useState([]);
  const attendCountTotal = useAttendRateQueries(CHART_MONTH_RANGE);
  const voteCountTotal = useVoteRateQueries(CHART_MONTH_RANGE);

  const isVoteLoading = voteCountTotal.some((result) => result.isLoading);
  const isAttendLoading = attendCountTotal.some((result) => result.isLoading);
  const [whyLoading, setWhyLoading] = useState(false);

  const getDataArray = (
    uid: string,
    queryResult: UseQueryResult<IVoteRate[], AxiosError<unknown, any>>[]
  ) => {
    return queryResult
      ?.map((item) => {
        if (item.isSuccess) {
          const myDataArr = item.data.filter((data) => data.uid === uid);
          return myDataArr[0]?.cnt;
        }
        return null;
      })
      .concat(null);
  };

  useEffect(() => {
    setTimeout(() => {
      setWhyLoading(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (isVoteLoading || isAttendLoading) {
      return;
    }
    let tempLoading = true;
    if (!isVoteLoading) {
      const newVoteAverageArr = voteCountTotal?.map((month) => {
        let userCnt = 0;
        return Math.round(
          month?.data?.reduce((acc, cur) => {
            if (cur.cnt !== 0) userCnt++;
            return acc + cur.cnt;
          }, 0) /
            (userCnt + 5)
        );
      });
      setVoteAverageArr(newVoteAverageArr);
      tempLoading = false;
    } else tempLoading = true;
    if (!isAttendLoading) {
      setMyAttendCountTotal(getDataArray(Uid as string, attendCountTotal));
    } else tempLoading = true;
    if (!tempLoading) setIsLoading(false);
    else setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVoteLoading, isAttendLoading]);

  let yMax = 5;

  if (myAttendCountTotal) {
    let max = 0;
    myAttendCountTotal.forEach((cnt) => {
      if (cnt > max) max = cnt;
    });
    if (max > 15) yMax = 18;
    else if (max > 12) yMax = 15;
    else if (max > 10) yMax = 12;
    else if (max > 5) yMax = 9;
  }

  return (
    <div>
      {type === "main" && !isLoading && whyLoading ? (
        <MainWrapper>
          <ApexCharts
            type="line"
            series={[
              { name: "평균 참여율", data: voteAverageArr },
              { name: "스터디 참여", data: myAttendCountTotal },
            ]}
            options={{
              chart: {
                zoom: {
                  enabled: false,
                },
              },

              stroke: {
                curve: "straight",
              },

              title: {
                text: text,
                align: "left",
              },
              grid: {
                row: {
                  colors: ["#f3f3f3", "transparent"],
                  opacity: 0.5,
                },
              },

              xaxis: {
                categories: monthXaxis,
              },
              yaxis: {
                min: 0,
                max: yMax,
                forceNiceScale: true,
              },
            }}
          />
        </MainWrapper>
      ) : type === "modal" && !isLoading && whyLoading ? (
        <ApexCharts
          type="line"
          series={[
            { name: "평균 참여율", data: isLoading ? [] : voteAverageArr },
            { name: "스터디 참여", data: isLoading ? [] : myAttendCountTotal },
          ]}
          options={{
            chart: {
              zoom: {
                enabled: false,
              },
              toolbar: { show: false },
            },

            stroke: {
              curve: "straight",
            },

            title: {
              text: text,
              align: "left",
            },
            grid: {
              row: {
                colors: ["#f3f3f3", "transparent"],
                opacity: 0.5,
              },
            },

            xaxis: {
              categories: monthXaxis,
            },
            yaxis: {
              min: 0,
              max: yMax,
              forceNiceScale: true,
            },

            legend: {
              floating: true,
              position: "bottom",
              offsetY: -30,
              horizontalAlign: "right",
              fontSize: "10px",
            },
          }}
        />
      ) : null}
    </div>
  );
}

const MainWrapper = styled.div`
  min-height: 213px;
`;

export default AttendChart;
