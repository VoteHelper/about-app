import { useEffect } from "react";

import { isWebView } from "../../utils/appEnvUtils";
import { urlBase64ToUint8Array } from "../../utils/convertUtils/convertBase64";
import { nativeMethodUtils } from "../../utils/nativeMethodUtils";
import { isEmpty, isNil } from "../../utils/validationUtils";
import { registerPushServiceWithApp, registerPushServiceWithPWA } from "./apis";
import { DeviceInfo } from "./types";
import { requestNotificationPermission } from "./utils";

export const usePushServiceInitialize = ({ uid }: { uid?: string }) => {
  useEffect(() => {
    const initializePushService = async () => {
      if (isWebView()) {
        await initializeAppPushService(uid);
      } else {
        await initializePWAPushService();
      }
    };

    initializePushService();
  }, [uid]);
};

const initializeAppPushService = async (uid?: string) => {
  const handleDeviceInfo = async (event: MessageEvent) => {
    try {
      const { data } = event;
      if (typeof data !== "string" || !data.includes("deviceInfo")) return;

      const deviceInfo: DeviceInfo = JSON.parse(data);
      if (isNil(uid) || isEmpty(deviceInfo)) return;

      await registerPushServiceWithApp({
        uid,
        fcmToken: deviceInfo.fcmToken,
        platform: deviceInfo.platform,
      });
    } catch (error) {
      console.error("Error handling device info:", error);
    }
  };

  window.addEventListener("message", handleDeviceInfo);
  nativeMethodUtils.getDeviceInfo();

  return () => {
    window.removeEventListener("message", handleDeviceInfo);
  };
};

const initializePWAPushService = async () => {
  try {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) return;

    const registration = await navigator.serviceWorker.register("/worker.js", { scope: "/" });
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) return;

    const publicVapidKey = process.env.NEXT_PUBLIC_PWA_KEY;
    if (!publicVapidKey) throw new Error("Missing NEXT_PUBLIC_PWA_KEY");

    const newSubscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    await registerPushServiceWithPWA(newSubscription);
    console.log("Successfully subscribed to push service");
  } catch (error) {
    console.error("Failed to initialize PWA push service:", error);
  }
};
