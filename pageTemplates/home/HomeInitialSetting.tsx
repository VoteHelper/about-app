import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Joyride, { CallBackProps, STATUS } from "react-joyride";
import { createGlobalStyle } from "styled-components";

import { STEPS_CONTENTS } from "../../constants/contentsText/GuideContents";
import { USER_GUIDE, USER_LOCATION } from "../../constants/keys/localStorage";
import { useToast } from "../../hooks/custom/CustomToast";
import { usePushServiceInitialize } from "../../hooks/FcmManger/mutaion";
import { useUserInfoFieldMutation } from "../../hooks/user/mutations";
import { useUserInfoQuery } from "../../hooks/user/queries";
import FAQPopUp from "../../modals/pop-up/FAQPopUp";
import UserSettingPopUp from "../../pageTemplates/setting/userSetting/userSettingPopUp";
import { isPWA } from "../../utils/appEnvUtils";
import { checkAndSetLocalStorage } from "../../utils/storageUtils";

function HomeInitialSetting() {
  const { data: session } = useSession();

  usePushServiceInitialize({
    uid: session?.user?.uid,
  });

  const router = useRouter();
  const toast = useToast();

  const isGuest = session
    ? session.user.name === "guest" || session.user.name === "게스트"
    : undefined;

  const [joyrideRun, setJoyrideRun] = useState(true);

  const [isGuestModal, setIsGuestModal] = useState(false);
  const { data: userInfo } = useUserInfoQuery({
    enabled: isGuest === false,
    onSuccess(data) {
      if (data.role === "newUser") {
        router.push("/register/location");
        return;
      }
      if (data.role === "waiting") {
        router.push("/login?status=waiting");
        return;
      }
    },
  });

  const { mutate: setRole } = useUserInfoFieldMutation("role", {
    onSuccess() {
      toast("success", "동아리원이 되었습니다.");
    },
  });

  const isPWALogin = isPWA();

  useEffect(() => {
    if (userInfo?.role === "human") {
      if (isPWALogin) {
        setRole({ role: "member" });
      }
    }
  }, [userInfo?.role]);

  useEffect(() => {
    if (isGuest) {
      localStorage.setItem(USER_LOCATION, "수원");
    }

    if (isGuest && !checkAndSetLocalStorage(USER_GUIDE, 1)) {
      setIsGuestModal(true);
      setJoyrideRun(true);
    }

    if (userInfo) {
      localStorage.setItem(USER_LOCATION, userInfo.location);
      if (dayjs().diff(dayjs(userInfo?.registerDate)) <= 7) {
        if (!checkAndSetLocalStorage(USER_GUIDE, 3)) setJoyrideRun(true);
      } else if (!checkAndSetLocalStorage(USER_GUIDE, 14)) setJoyrideRun(true);
    }
  }, [isGuest, userInfo]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inappdenyExecVanillajs = (callback: any) => {
      if (document.readyState !== "loading") callback();
      else document.addEventListener("DOMContentLoaded", callback);
    };
    inappdenyExecVanillajs(() => {
      const useragt = navigator.userAgent.toLowerCase();
      const targetUrl = location.href;
      if (useragt.match(/kakaotalk/i)) {
        location.href = "kakaotalk://web/openExternal?url=" + encodeURIComponent(targetUrl);
      }
    });
  }, []);

  // useEffect(() => {
  //   requestAndSubscribePushService();
  // }, []);

  const handleJoyrideCallback = (props: CallBackProps) => {
    const { status } = props;

    const finishedStatus = ([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status);

    if (finishedStatus) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setJoyrideRun(false);
    }
  };

  return (
    <>
      <button type="button" onClick={() => setJoyrideRun(true)}>
        active joyride
      </button>
      {userInfo && !isGuest && <UserSettingPopUp userInfo={userInfo} />}
      {isGuestModal && <FAQPopUp setIsModal={setIsGuestModal} />}
      <GlobalStyle />
      <Joyride
        hideCloseButton
        continuous
        showSkipButton
        disableOverlayClose
        disableCloseOnEsc
        callback={handleJoyrideCallback}
        steps={STEPS_CONTENTS}
        run={joyrideRun}
        styles={{
          options: {
            width: 320,
            zIndex: 1000,
          },
        }}
        spotlightPadding={8}
        scrollOffset={60}
      />
    </>
  );
}

const GlobalStyle = createGlobalStyle`

  .react-joyride__tooltip{
    height:180px !important;
    padding:16px !important;
 display:flex;
 flex-direction:column;
    >div:nth-child(2){
      margin-top:auto !important;
      display:flex !important;
      align-items:flex-end !important;
    >div:first-child{
      >button{
      font-size:16px !important;
      }

    }
      >button{
        margin-left:var(--gap-2) !important;
      padding:0 !important;
        background-color:inherit !important;
        :focus{
          outline:none;
        }
        >div{
          font-size:15px;
          padding:4px 16px;
        }
      }
    }
  }
  .react-joyride__beacon {
    >span:first-child{
      background-color:var(--color-mint) !important;

    }
    >span:last-child{
    border-color:var(--color-mint) !important;
 background-color:var(--color-mint-light) !important;
      
    }
   
  }
`;

export default HomeInitialSetting;
