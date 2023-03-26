import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import {
  IRate,
  useAttendRateQueries,
  useParticipationRateQuery,
  useVoteRateQueries,
  useVoteRateQuery,
} from "../../hooks/user/queries";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { getMonth, getToday, now } from "../../libs/utils/dateUtils";
import styled from "styled-components";

export interface IDateStartToEnd {
  start: Dayjs;
  end: Dayjs;
}

export default function AttendChart({ type }: { type?: string }) {
  const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
  const { data: session } = useSession();
  const name = session?.user.name;

  const monthList: IDateStartToEnd[] = [];

  for (let i = 0; i <= Number(getMonth()); i++) {
    const changeMonthDate = (month: number, num: number) =>
      dayjs().month(i).date(num);
    monthList.push({
      start: changeMonthDate(i, 1),
      end: changeMonthDate(i, dayjs().month(i).daysInMonth()),
    });
  }

  const voteCountTotal = useVoteRateQueries(monthList);

  const attendCountTotal = useAttendRateQueries(monthList);

  const isLoading = voteCountTotal.some((result) => result.isLoading);
  const myVoteCountTotal = voteCountTotal?.map((item) => {
    if (item.isSuccess) {
      const myDataArr = (item.data as IRate[]).filter(
        (data) => data.name === name
      );

      return myDataArr[0]?.cnt;
    }
  });
  const myAttendCountTotal = attendCountTotal?.map((item) => {
    if (item.isSuccess) {
      const myData = (item.data as IRate[]).filter(
        (data) => data.name === name
      );

      return myData[0]?.cnt;
    }
  });
  if (!isLoading) {
    myVoteCountTotal[0] = 0;
    myAttendCountTotal[0] = 0;
  }
  myVoteCountTotal.push(null);
  myAttendCountTotal.push(null);

  const text = type === "modal" ? undefined : "내 스터디 참여";

  return (
    <div>
      {type === "main" ? (
        <ApexCharts
          type="line"
          series={[
            { name: "스터디 투표", data: isLoading ? [] : myVoteCountTotal },
            { name: "스터디 참여", data: isLoading ? [] : myAttendCountTotal },
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
              categories: ["1월", "2월", "3월", "4월"],
            },
          }}
        />
      ) : (
        <ApexCharts
          type="line"
          series={[
            { name: "스터디 투표", data: isLoading ? [] : myVoteCountTotal },
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
              categories: ["1월", "2월", "3월", "4월"],
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
      )}
    </div>
  );
}
