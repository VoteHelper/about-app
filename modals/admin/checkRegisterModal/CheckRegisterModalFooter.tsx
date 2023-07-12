import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import styled from "styled-components";
import { useCompleteToast } from "../../../hooks/ui/CustomToast";
import {
  useUserApproveMutation,
  useUserDeleteMutation,
} from "../../../hooks/user/mutations";
import { IModal, IRefetch } from "../../../types/common";

interface ICheckRegisterModalFooter extends IModal, IRefetch {
  uid: string;
}

function CheckRegisterModalFooter({
  setIsModal,
  setIsRefetch,
  uid,
}: ICheckRegisterModalFooter) {
  const completeToast = useCompleteToast();
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate: approve } = useUserApproveMutation({
    onSuccess() {
      console.log("suc");
    },
  });
  const { mutate: deleteForm } = useUserDeleteMutation({
    onSuccess() {
      console.log(3);
    },
  });

  const onClickAgree = () => {
    approve(uid);
    console.log(222);
    setIsRefetch(true);
    setIsModal(false);
  };

  const onClickDelete = () => {
    onClose();
    deleteForm(uid);
    setIsModal(false);
    completeToast("success");
    setIsRefetch(true);
  };

  return (
    <>
      <Layout>
        <Button width="50%" onClick={onOpen}>
          거절
        </Button>
        <Button width="50%" colorScheme="mintTheme" onClick={onClickAgree}>
          승인
        </Button>
      </Layout>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent width="340px">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              가입 거절
            </AlertDialogHeader>
            <AlertDialogBody>정말로 거절할거야?</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                취소
              </Button>
              <Button colorScheme="mintTheme" onClick={onClickDelete} ml={3}>
                거절
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

const Layout = styled.footer`
  display: flex;
`;

export default CheckRegisterModalFooter;
