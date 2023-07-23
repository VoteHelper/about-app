import { useRecoilState } from "recoil";
import styled from "styled-components";

import dayjs from "dayjs";
import "dayjs/locale/ko"; // 로케일 플러그인 로드
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MainLoading } from "../../../components/common/MainLoading";
import PageLayout from "../../../components/layout/PageLayout";
import { useGatherContentQuery } from "../../../hooks/gather/queries";
import GatherBadge from "../../../pagesComponents/gather/detail/GatherBadge";
import GatherBottomNav from "../../../pagesComponents/gather/detail/GatherBottomNav";
import GatherComments from "../../../pagesComponents/gather/detail/GatherComment";
import GatherContent from "../../../pagesComponents/gather/detail/GatherContent";
import GatherDetailInfo from "../../../pagesComponents/gather/detail/GatherDetail";
import GatherHeader from "../../../pagesComponents/gather/detail/GatherHeader";
import GatherOrganizer from "../../../pagesComponents/gather/detail/GatherOrganizer";
import GatherParticipation from "../../../pagesComponents/gather/detail/GatherParticipation";
import GatherTitle from "../../../pagesComponents/gather/detail/GatherTitle";
import { transferGatherDataState } from "../../../recoil/transferDataAtoms";

function GatherDetail() {
  const router = useRouter();
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";
  const gatherId = router.query.id;
  const [gatherData, setGatherData] = useRecoilState(transferGatherDataState);
  const [isRefetch, setIsRefetch] = useState(false);
  const { refetch } = useGatherContentQuery({
    onSuccess(data) {
      setGatherData(data?.find((item) => item?.id === +gatherId));
    },
  });

  useEffect(() => {
    if (isRefetch || !gatherData) {
      setTimeout(() => {
        refetch();
        setIsRefetch(false);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gatherData, isRefetch]);

  return (
    <>
      {!gatherData ? (
        <MainLoading />
      ) : (
        <PageLayout>
          <GatherHeader
            title={gatherData.title}
            date={dayjs(gatherData.date)}
            locationMain={gatherData.location.main}
          />
          <Layout>
            <GatherBadge typeTitle={gatherData.type.title} />
            <GatherOrganizer
              createdAt={gatherData.createdAt}
              organizer={gatherData.user}
            />

            <GatherTitle title={gatherData.title} status={gatherData.status} />
            <GatherDetailInfo data={gatherData} />
            <GatherContent
              content={gatherData.content}
              gatherList={gatherData.gatherList}
            />
            <GatherParticipation data={gatherData} />
            <GatherComments
              comment={gatherData.comment}
              setIsRefetch={setIsRefetch}
            />
            {!isGuest && (
              <GatherBottomNav data={gatherData} setIsRefetch={setIsRefetch} />
            )}
          </Layout>
        </PageLayout>
      )}
    </>
  );
}

const Layout = styled.div`
  padding: 0 14px;
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
`;

export default GatherDetail;
