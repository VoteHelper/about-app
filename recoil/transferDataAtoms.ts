import { atom } from "recoil";
import { IGatherContent } from "../types/page/gather";
import { MemberGroup } from "../types/page/member";

import { IParticipation } from "../types/study/studyDetail";
import { IUser } from "../types/user/user";

export const transferUserDataState = atom<IUser>({
  key: "transferUserData",
  default: null,
});
export const transferGatherDataState = atom<IGatherContent>({
  key: "transferGatherData",
  default: null,
});

export const transferStudyDataState = atom<IParticipation[]>({
  key: "transferStudyData",
  default: null,
});

export const transferMemberDataState = atom<{
  section: MemberGroup | "all";
  members: IUser[];
}>({
  key: "transferMemberData",
  default: null,
});

export const transferStudySpaceDataState = atom<IParticipation>({
  key: "transferStudySpaceData",
  default: null,
});
