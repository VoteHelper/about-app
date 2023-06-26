import { useRecoilState } from "recoil";
import styled from "styled-components";

import dayjs from "dayjs";
import "dayjs/locale/ko"; // 로케일 플러그인 로드
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MainLoading } from "../../../components/common/MainLoading";
import { useGatherContentQuery } from "../../../hooks/gather/queries";
import GatherBadge from "../../../pagesComponents/Gather/Detail/GatherBadge";
import GatherBottomNav from "../../../pagesComponents/Gather/Detail/GatherBottomNav";
import GatherComments from "../../../pagesComponents/Gather/Detail/GatherComment";
import GatherContent from "../../../pagesComponents/Gather/Detail/GatherContent";
import GatherDetailInfo from "../../../pagesComponents/Gather/Detail/GatherDetail";
import GatherHeader from "../../../pagesComponents/Gather/Detail/GatherHeader";
import GatherOrganizer from "../../../pagesComponents/Gather/Detail/GatherOrganizer";
import GatherParticipation from "../../../pagesComponents/Gather/Detail/GatherParticipation";
import GatherTitle from "../../../pagesComponents/Gather/Detail/GatherTitle";
import { transferGatherDataState } from "../../../recoil/transferDataAtoms";

function GatherDetail() {
  const router = useRouter();
  const gatherId = router.query.id;
  const [gatherData, setGatherData] = useRecoilState(transferGatherDataState);
  const [isRefetching, setIsRefetching] = useState(false);
  const { data: gatherContentArr, refetch } = useGatherContentQuery({
    onSuccess(data) {
      setGatherData(data?.find((item) => item?.id === +gatherId));
    },
  });

  useEffect(() => {
    if (isRefetching || !gatherData) {
      setTimeout(() => {
        refetch();
        setIsRefetching(false);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gatherData, isRefetching]);

  return (
    <>
      {!gatherData ? (
        <MainLoading />
      ) : (
        <>
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
            <GatherComments comment={gatherData.comment} />
            <GatherBottomNav
              data={gatherData}
              setIsRefetching={setIsRefetching}
            />
          </Layout>
        </>
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
