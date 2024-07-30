import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Header from "../../components/layouts/Header";
import Slide from "../../components/layouts/PageSlide";
import { useMyChatsQuery, useRecentChatQuery } from "../../hooks/chat/queries";
import { useNoticeActiveLogQuery } from "../../hooks/user/sub/interaction/queries";
import NoticeActive from "../../pageTemplates/notice/NoticeActive";
import NoticeChat from "../../pageTemplates/notice/NoticeChat";
import NoticeItem from "../../pageTemplates/notice/NoticeItem";
import NoticeNav from "../../pageTemplates/notice/NoticeNav";

export type NoticeType = "notice" | "active" | "chat";

function Notice() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") as NoticeType;

  const [noticeType, setNoticeType] = useState<NoticeType>("notice");
  const { data: activeLogs } = useNoticeActiveLogQuery();
  const { data: chats } = useMyChatsQuery();
  console.log(44, chats);
  const { data: recentChat } = useRecentChatQuery();
  console.log(54, recentChat);
  useEffect(() => {
    if (!type) router.replace(`/notice?type=notice`);
    setNoticeType(type);
  }, [type]);

  return (
    <>
      <Slide isFixed={true}>
        <Header title="알림" isSlide={false} />
        <NoticeNav
          noticeType={noticeType}
          setNoticeType={setNoticeType}
          activeAlertCnt={activeLogs?.length}
          recentChatId={recentChat}
        />
      </Slide>
      <Slide>
        <Container>
          {noticeType === "notice" ? (
            <NoticeItem />
          ) : noticeType === "active" ? (
            <NoticeActive activeLogs={activeLogs} />
          ) : (
            <NoticeChat chats={chats} />
          )}
        </Container>
      </Slide>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 56px;
  background-color: white;
`;

export default Notice;
