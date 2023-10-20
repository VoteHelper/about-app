import { faChevronRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styled from "styled-components";

interface IPointScoreNavigation {
  myScore: number;
}

function PointScoreNavigation({ myScore }: IPointScoreNavigation) {
  const router = useRouter();

  return (
    <>
      <Layout>
        <Button onClick={() => router.push("/point/scoreLog")}>
          <div>About 점수</div>
          <div>
            <span>{myScore || 0}점</span>
            <FontAwesomeIcon icon={faChevronRight} size="xs" />
          </div>
        </Button>
        <Button onClick={() => router.push("/ranking")}>
          <div>About 랭킹</div>
          <div>
            <FontAwesomeIcon icon={faChevronRight} size="xs" />
          </div>
        </Button>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  padding: var(--padding-sub) var(--padding-md);
  > div:first-child {
    font-size: 14px;
  }
  > div:last-child {
    display: flex;
    align-items: center;
    > span:first-child {
      margin-right: var(--margin-md);
    }
  }
`;

export default PointScoreNavigation;
