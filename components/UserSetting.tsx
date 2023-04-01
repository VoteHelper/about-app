import React from "react";
import { useEffect, useState } from "react";
import ModalPortal from "./ModalPortal";
import RegisterFormModal from "../modals/user/RegisterFormModal";
import { useSession } from "next-auth/react";
import WeekAttendPopup from "../modals/pop-up/LastWeekAttendPopUp";
import { IUser } from "../types/user";
import { useSetRecoilState } from "recoil";
import { numOfUserState } from "../recoil/userAtoms";

export default function UserSetting({ UserList }: { UserList: IUser[] }) {
  const { data: session } = useSession();
  const [isAttendPopup, setIsAttendPopup] = useState(false);
  const [isRegisterModal, setIsRegisterModal] = useState(false);
  const setNumOfUser = useSetRecoilState(numOfUserState);

  useEffect(() => {
    const NumOfUser = UserList?.filter((user) => user.isActive).length;
    setNumOfUser(NumOfUser);
    if (session?.isActive === false) setIsRegisterModal(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**유저 팝업 */
  useEffect(() => {
    // if (localStorage.getItem(LAST_WEEK_ATTEND) !== "true") {
    //   localStorage.setItem(LAST_WEEK_ATTEND, "true");
    // }
  }, []);

  return (
    <>
      {isAttendPopup && (
        <ModalPortal closePortal={setIsAttendPopup}>
          <WeekAttendPopup closePopUp={setIsAttendPopup} />
        </ModalPortal>
      )}
      {isRegisterModal && (
        <ModalPortal closePortal={setIsRegisterModal}>
          <RegisterFormModal setIsModal={setIsRegisterModal} />
        </ModalPortal>
      )}
    </>
  );
}
