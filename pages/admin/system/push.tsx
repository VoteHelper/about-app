import { Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { Input } from "../../../components/atoms/Input";
import Header from "../../../components/layouts/Header";
import { usePushQuery } from "../../../hooks/admin/quries";
import { useTypeToast } from "../../../hooks/custom/CustomToast";

function PushPage() {
  const typeToast = useTypeToast();
  const [value, setValue] = useState("");
  const [uid, setUid] = useState<string>();

  usePushQuery(uid, {
    enabled: !!uid,
  });

  const onClick = () => {
    setUid(value);
  };

  return (
    <>
      <Header title="푸쉬 알림 테스트" />
      <Flex p="20px">
        <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="UID 입력" />
        <Button colorScheme="mintTheme" ml="16px" onClick={onClick}>
          전송
        </Button>
      </Flex>
    </>
  );
}

export default PushPage;
