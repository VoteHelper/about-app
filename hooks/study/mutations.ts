import axios, { AxiosError } from "axios";
import { Dayjs } from "dayjs";
import { useMutation, UseMutationOptions } from "react-query";
import { SERVER_URI } from "../../constants/system";
import { dayjsToStr } from "../../libs/typeConverter";
import { IStudyPreferences } from "../../modals/userRequest/RequestStudyPreferenceModal";
import { IStudyParticipate } from "../../types/study";

import { ITimeStartToEnd } from "../../types/utils";

export const useStudyParticipateMutation = (
  date: Dayjs,
  options?: Omit<
    UseMutationOptions<void, AxiosError, IStudyParticipate>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, IStudyParticipate>(async (studyParticipate) => {
    await axios.post(
      `${SERVER_URI}/vote/${dayjsToStr(date)}`,
      studyParticipate
    );
  }, options);

export const useStudyCancelMutation = (
  date: Dayjs,
  options?: Omit<
    UseMutationOptions<void, AxiosError, void>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, void>(async () => {
    await axios.delete(`${SERVER_URI}/vote/${dayjsToStr(date)}`);
  }, options);

export const useStudyTimeChangeMutation = (
  date: Dayjs,
  options?: Omit<
    UseMutationOptions<void, AxiosError, ITimeStartToEnd>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, ITimeStartToEnd>(async (time) => {
    await axios.patch(`${SERVER_URI}/vote/${dayjsToStr(date)}`, time);
  }, options);

export const useStudyArrivedMutation = (
  date: Dayjs,
  options?: Omit<
    UseMutationOptions<void, AxiosError, string>,
    "mutationKey" | "mutationFn"
  >
) =>
  useMutation<void, AxiosError, string>(async (memo) => {
    await axios.patch(`${SERVER_URI}/vote/${dayjsToStr(date)}/arrived`, {
      memo,
    });
  }, options);

export const useStudyResultDecideMutation = (
  date: Dayjs,
  options?: Omit<
    UseMutationOptions<void, AxiosError, void>,
    "queryKey" | "queryFn"
  >
) =>
  useMutation(async () => {
    await axios.patch<void>(
      `${SERVER_URI}/admin/vote/${dayjsToStr(date)}/status/confirm`
    );
  }, options);

export const useStudyAbsentMutation = (
  date: Dayjs,
  options?: Omit<
    UseMutationOptions<void, AxiosError, string>,
    "queryKey" | "queryFn"
  >
) =>
  useMutation(async (message) => {
    await axios.post(`${SERVER_URI}/vote/${dayjsToStr(date)}/absence`, {
      message,
    });
  }, options);

export const useStudyQuickVoteMutation = (
  date: Dayjs,
  options?: Omit<
    UseMutationOptions<void, AxiosError, { start: Dayjs; end: Dayjs }>,
    "queryKey" | "queryFn"
  >
) =>
  useMutation<void, AxiosError, { start: Dayjs; end: Dayjs }>(
    async ({ start, end }) => {
      const res = await axios.post(
        `${SERVER_URI}/vote/${dayjsToStr(date)}/quick`,
        {
          start,
          end,
        }
      );
      return res.data;
    },
    options
  );

export const useStudyPreferenceMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, IStudyPreferences>,
    "queryKey" | "queryFn"
  >
) =>
  useMutation<void, AxiosError, IStudyPreferences>(
    async ({ place, subPlace }) => {
      await axios.post(`${SERVER_URI}/user/preference`, { place, subPlace });
    },
    options
  );

export const useStudyOpenFreeMutation = (
  date: Dayjs,
  options?: Omit<
    UseMutationOptions<void, AxiosError, string>,
    "queryKey" | "queryFn"
  >
) =>
  useMutation<void, AxiosError, string>(async (placeId) => {
    await axios.patch(`${SERVER_URI}/vote/${dayjsToStr(date)}/free`, {
      placeId,
    });
  }, options);
