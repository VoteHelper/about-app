import { Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import styled from "styled-components";
import { GATHER_CONTENT } from "../../../constants/keys/queryKeys";
import { useResetQueryData } from "../../../hooks/CustomHooks";
import { useCompleteToast, useErrorToast } from "../../../hooks/CustomToast";
import { useGatherParticipationMutation } from "../../../hooks/gather/mutations";
import GatherExpireModal from "../../../modals/gather/gatherExpireModal/GatherExpireModal";
import GatherParticipateModal from "../../../modals/gather/gatherParticipateModal/GatherParticipateModal";
import { GatherStatus, IGather } from "../../../types/page/gather";

interface IGatherBottomNav {
  data: IGather;
}

type ButtonType = "cancel" | "participate" | "expire";

function GatherBottomNav({ data }: IGatherBottomNav) {
  const router = useRouter();
  const completeToast = useCompleteToast();

  const errorToast = useErrorToast();
  const { data: session } = useSession();
  const myUid = session.uid;
  const myGather = data.user.uid === myUid;
  const isParticipant = data?.participants.some(
    (who) => who?.user.uid === myUid
  );
  const [isExpirationModal, setIsExpirationModal] = useState(false);
  const [isParticipationModal, setIsParticipationModal] = useState(false);
  const gatherId = +router.query.id;

  const resetQueryData = useResetQueryData();
  const { mutate: cancel } = useGatherParticipationMutation(
    "delete",
    gatherId,
    {
      onSuccess() {
        completeToast("free", "취소되었습니다.", true);
        resetQueryData([GATHER_CONTENT]);
      },
      onError: errorToast,
    }
  );

  const onClick = (type: ButtonType) => {
    if (type === "cancel") cancel();
    if (type === "participate") setIsParticipationModal(true);
    if (type === "expire") setIsExpirationModal(true);
  };

  interface IButtonSetting {
    text: string;
    handleFunction?: () => void;
  }

  const getButtonSettings = (status: GatherStatus): IButtonSetting => {
    switch (status) {
      case "open":
        return {
          text: "모임장은 단톡방을 만들어주세요!",
        };
      case "close":
        return {
          text: "취소된 모임입니다.",
        };
    }
    if (myGather)
      return { text: "모집 종료", handleFunction: () => onClick("expire") };
    if (isParticipant) {
      return { text: "참여 취소", handleFunction: () => onClick("cancel") };
    }
    return {
      text: "참여하기",
      handleFunction: () => onClick("participate"),
    };
  };

  const { text, handleFunction } = getButtonSettings(data?.status);

  return (
    <>
      <Layout>
        <Button
          size="lg"
          w="100%"
          borderRadius="var(--border-radius-main)"
          disabled={!handleFunction}
          colorScheme={handleFunction ? "mintTheme" : "blackAlpha"}
          onClick={handleFunction}
        >
          {text}
        </Button>
      </Layout>
      {isParticipationModal && (
        <GatherParticipateModal setIsModal={setIsParticipationModal} />
      )}
      {isExpirationModal && (
        <GatherExpireModal setIsModal={setIsExpirationModal} />
      )}
    </>
  );
}

const Layout = styled.nav`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0);
  width: 100%;
  max-width: 390px;
  padding: var(--padding-main);
`;

export default GatherBottomNav;
