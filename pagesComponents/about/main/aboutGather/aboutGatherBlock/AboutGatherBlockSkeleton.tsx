import styled from "styled-components";
import Skeleton from "../../../../../components/common/masks/skeleton/Skeleton";

function AboutGatherBlockSkeleton() {
  return (
    <Layout>
      <ImageContainer>
        <Skeleton>temp</Skeleton>
      </ImageContainer>
      <SpaceInfo>
        <GatherBlockStatus>
          <div>
            <Skeleton>temp</Skeleton>
          </div>
          <div>
            <Skeleton>temp</Skeleton>
          </div>
        </GatherBlockStatus>
        <Info>
          <Skeleton>temp</Skeleton>
        </Info>
        <GatherBlockParticipants>
          <Skeleton>temp</Skeleton>
        </GatherBlockParticipants>
      </SpaceInfo>
    </Layout>
  );
}

const GatherBlockStatus = styled.div`
  display: flex;
  justify-content: space-between;
  height: 22px;
  margin-bottom: 4px;
  > div:first-child {
    width: 70%;
  }
  > div:last-child {
    width: 40px;
  }
`;
const GatherBlockParticipants = styled.div`
  width: 36px;
  margin-left: auto;
`;

const Layout = styled.div`
  height: 110px;
  background-color: white;
  box-shadow: var(--box-shadow-b);
  border-radius: var(--border-radius2);
  display: flex;
  align-items: center;
  margin-bottom: var(--margin-main);
  padding: var(--padding-sub);
`;

const ImageContainer = styled.div`
  position: relative;
  height: 100%;
  aspect-ratio: 1/1;
  border: var(--border-sub);
  border-radius: var(--border-radius2);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const SpaceInfo = styled.div`
  margin-left: var(--margin-sub);
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
`;

const Info = styled.div`
  display: flex;
  width: 92px;
  color: var(--font-h3);
  font-size: 13px;
  margin-bottom: auto;
`;

export default AboutGatherBlockSkeleton;
