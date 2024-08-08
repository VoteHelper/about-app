import { AxiosError } from "axios";
import { useMutation } from "react-query";

import { requestServer } from "../../libs/methodHelpers";
import { MutationOptions } from "../../types/hooks/reactTypes";

export type CommentParamProps<T> = T extends "post"
  ? {
      comment: string;
      commentId?: string;
    }
  : T extends "patch"
    ? {
        comment: string;
        commentId: string;
      }
    : {
        comment?: never;
        commentId: string;
      };

interface CommentRequestProps {
  id: string;
  comment?: string;
  commentId?: string;
}

export const useCommentMutation = <T extends "post" | "patch" | "delete">(
  method: T,
  type: "gather" | "group",
  id: string,
  options?: MutationOptions<CommentParamProps<T>>,
) =>
  useMutation<void, AxiosError, CommentParamProps<T>>((param) => {
    const url = (type === "group" ? "groupStudy" : type) + "/comment";
    return requestServer<CommentRequestProps>({
      method,
      url,
      body: {
        id,
        comment: param?.comment,
        commentId: param?.commentId,
      },
    });
  }, options);

export type SubCommentParamProps<T> = T extends "post"
  ? {
      comment: string;
      commentId?: string;
      gatherId: string;
      subCommentId?: string;
    }
  : T extends "patch"
    ? {
        comment: string;
        commentId: string;
        gatherId: string;
        subCommentId: string;
      }
    : {
        comment?: never;
        commentId: string;
        gatherId: string;
        subCommentId: string;
      };

interface SubCommentRequestProps {
  comment?: string;
  commentId?: string;
  subCommentId?: string;
  [key: string]: string | undefined;
}

export const useSubCommentMutation = <T extends "post" | "patch" | "delete">(
  method: T,
  type: "gather" | "group",
  id: string,
  options?: MutationOptions<SubCommentParamProps<T>>,
) =>
  useMutation<void, AxiosError, SubCommentParamProps<T>>((param) => {
    const typeName = type === "group" ? "groupStudy" : type;

    return requestServer<SubCommentRequestProps>({
      method,
      url: typeName + "/subComment",
      body: {
        [typeName + "Id"]: id,
        comment: param?.comment,
        commentId: param?.commentId,
        ...(method !== "post" && { subCommentId: param?.subCommentId }),
      },
    });
  }, options);
