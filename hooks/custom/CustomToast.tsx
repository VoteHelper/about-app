import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useCallback } from "react";

export type FailToast =
  | "free"
  | "guest"
  | "loadStudy"
  | "studyVote"
  | "apply"
  | "error"
  | "time";

export const useFailToast = () => {
  const toast = useToast();

  const showFailToast = useCallback(
    (type: FailToast, sub?: string, isTop: boolean = false) => {
      let text = "";
      if (type === "free") text = sub;
      if (type === "error")
        text = "오류가 발생했어요! 관리자에게 문의해주세요!";
      if (type === "guest") text = "게스트는 사용할 수 없는 기능입니다.";
      if (type === "loadStudy") text = "스터디 정보를 불러오지 못 했어요.";
      if (type === "apply") text = "신청에 실패했어요. 조건을 확인해 주세요!";
      if (type === "time") text = "입력하신 시간을 다시 확인해주세요!";

      toast({
        title: "실패",
        description: text,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: isTop ? "top" : "bottom",
      });
    },
    [toast]
  );
  return showFailToast;
};

export type CompleteToast =
  | "free"
  | "content"
  | "success"
  | "studyVote"
  | "apply"
  | "change"
  | "point";

export const useCompleteToast = () => {
  const toast = useToast();
  const showCompleteToast = useCallback(
    (type: CompleteToast, sub?: string | number, isTop: boolean = false) => {
      let text = "";
      if (type === "free" || type === "content") text = sub as string;

      if (type === "change") text = "변경되었습니다.";
      if (type === "apply") text = "신청 완료!";
      if (type === "success") text = "정상적으로 처리되었습니다.";
      if (type === "studyVote") {
        text = "투표 완료! 포인트가 적립되었습니다.";
      }
      if (type === "content")
        toast({
          title: "성공",
          description: text,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: isTop ? "top" : "bottom",
          variant: "subtle",
        });
      else
        toast({
          title: text,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: isTop ? "top" : "bottom",
          variant: "subtle",
        });
    },
    [toast]
  );

  return showCompleteToast;
};

export const useErrorToast = () => {
  const failToast = useFailToast();
  const handleError = (err: AxiosError) => {
    console.error(err);
    failToast("error");
  };
  return handleError;
};

export const useTypeErrorToast = () => {
  const failToast = useFailToast();
  const handleError = (err: AxiosError, type: "user" | "study") => {
    console.error(err);
    if (type === "user")
      failToast(
        "free",
        "유저 정보를 확인할 수 없습니다. 관리자에게 문의해주세요!"
      );

    if (type === "study")
      failToast(
        "free",
        "스터디 정보를 가져올 수 없습니다. 관리자에게 문의해주세요!"
      );
  };
  return handleError;
};
