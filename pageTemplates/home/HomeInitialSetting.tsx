import axios from "axios";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { useSetRecoilState } from "recoil";
import { createGlobalStyle } from "styled-components";

import PCBottomNav from "../../components/layouts/PCBottomNav";
import { SERVER_URI } from "../../constants/apiConstants";
import { STEPS_CONTENTS } from "../../constants/contentsText/GuideContents";
import { USER_GUIDE } from "../../constants/keys/localStorage";
import { useToast } from "../../hooks/custom/CustomToast";
import { useUserInfoFieldMutation } from "../../hooks/user/mutations";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { getStudyDateStatus } from "../../libs/study/date/getStudyDateStatus";
import FAQPopUp from "../../modals/pop-up/FAQPopUp";
import UserSettingPopUp from "../../pageTemplates/setting/userSetting/userSettingPopUp";
import { renderHomeHeaderState } from "../../recoils/renderRecoils";
import { studyDateStatusState } from "../../recoils/studyRecoils";
import { checkAndSetLocalStorage } from "../../utils/storageUtils";
import { detectDevice } from "../../utils/validationUtils";

const publicVapidKey = process.env.NEXT_PUBLIC_PWA_KEY; // REPLACE_WITH_YOUR_KEY

const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  let rawData;
  try {
    rawData = window.atob(base64);
  } catch (e) {
    console.error("Failed to decode base64 string:", e);
    throw new Error("The string to be decoded is not correctly encoded.");
  }

  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
};

const requestNotificationPermission = async () => {
  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  return false;
};

const send = async (onSuccess) => {
  try {
    const register = await navigator.serviceWorker.register("/pwabuilder-sw.js", {
      scope: "/",
    });

    const isSubscription = await register.pushManager.getSubscription();

    if (isSubscription) return;

    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    await axios.post(`${SERVER_URI}/webpush/subscribe`, subscription);

    if (onSuccess) onSuccess(); // onSuccess 함수 호출
  } catch (err) {
    console.error(err);
  }
};

function HomeInitialSetting() {
  const toast = useToast();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");
  const isGuest = session?.user.name === "guest";

  const [isGuide, setIsGuide] = useState(false);
  const [isGuestModal, setIsGuestModal] = useState(false);

  const { data: userInfo } = useUserInfoQuery({ enabled: !isGuest });

  const setStudyDateStatus = useSetRecoilState(studyDateStatusState);
  const setRenderHomeHeaderState = useSetRecoilState(renderHomeHeaderState);

  const { mutate: setRole } = useUserInfoFieldMutation("role", {
    onSuccess() {
      toast("success", "동아리원이 되었습니다.");
    },
  });
  const isPWA = () => {
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    return isStandalone;
  };

  const isPWALogin = isPWA();

  useEffect(() => {
    if (userInfo?.role === "human") {
      if (isPWALogin) {
        setRole({ role: "member" });
      }
    }
  }, [userInfo?.role, isPWALogin]);

  useEffect(() => {
    setStudyDateStatus(getStudyDateStatus(dateParam));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateParam]);

  useEffect(() => {
    if (isGuest && !checkAndSetLocalStorage(USER_GUIDE, 1)) {
      setIsGuestModal(true);
      setIsGuide(true);
    }
    if (userInfo) {
      if (dayjs().diff(dayjs(userInfo?.registerDate)) <= 7) {
        if (!checkAndSetLocalStorage(USER_GUIDE, 3)) setIsGuide(true);
      } else if (!checkAndSetLocalStorage(USER_GUIDE, 14)) setIsGuide(true);
    }
  }, [isGuest, userInfo]);

  const registerPWA = async () => {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
      // alert(
      //   "Notification permission denied or not granted. Please enable notifications in your browser settings.",
      // );
      return;
    }

    send(() => {
      console.log("Push registration successful and additional function executed.");
    }).catch((err) => console.error(err));
  };

  useEffect(() => {
    registerPWA();
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

  const [{ steps }, setState] = useState<{
    run: boolean;
    steps?: Step[];
  }>({
    run: false,
    steps: STEPS_CONTENTS,
  });

  const handleJoyrideCallback = (data: CallBackProps) => {
    if (data.step.target === ".about_navigation1") {
      setRenderHomeHeaderState(false);
    }
    if (data.step.target === "body") {
      setRenderHomeHeaderState(true);
    }

    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setState({ run: false });
    }
  };

  return (
    <>
      {userInfo && !isGuest && <UserSettingPopUp cnt={isGuide ? 1 : 0} />}
      {isGuestModal && <FAQPopUp setIsModal={setIsGuestModal} />}
      <GlobalStyle />
      {!isPWALogin && detectDevice() !== "PC" && <PCBottomNav />}
      <Joyride
        hideCloseButton={true}
        callback={handleJoyrideCallback}
        continuous
        steps={steps}
        run={isGuide}
        showSkipButton
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
