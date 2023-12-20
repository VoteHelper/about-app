import { LocationFilterType } from "../system";
import { IUser } from "../user/user";
import { GatherStatus, IGatherComment } from "./gather";

export type GroupStudyCategory =
  | "전체"
  | "어학"
  | "프로그래밍"
  | "자격증"
  | "취업준비"
  | "자기계발"
  | "게임"
  | "기타"
  | "운동"
  | "친목";
export interface IGroupStudy extends IGroupStudyWriting {
  createdAt: string;
  participants: { user: IUser; role: "member" | "manager" | "admin" }[];
  comment: IGatherComment[];
}

export interface IGroupStudyWriting {
  category: IGroupStudyWritingCategory;
  title: string;
  content: string;
  status: GatherStatus;
  guide: string;
  feeText: string;
  image?: string;
  fee: number;
  gender: boolean;
  isFree: boolean;
  age: number[];
  password: string;
  period: string;
  organizer: IUser;
  location: LocationFilterType;
  date: string;
  questionText?: string;
  hashTag?: string;
  attendance: IGroupStudyAttendance;
  waiting: {
    user: IUser;
    answer?: string;
    pointType: "point" | "deposit";
  }[];
  memberCnt: {
    min: number;
    max: number;
  };
  id: number;
}

export interface IGroupStudyWritingCategory {
  main: string;
  sub: string;
}
export interface IWeekRecord {
  uid: string;
  name: string;
  attendRecord: string[];
}
export interface IGroupStudyAttendance {
  firstDate: string;
  lastWeek: IWeekRecord[];
  thisWeek: IWeekRecord[];
}
