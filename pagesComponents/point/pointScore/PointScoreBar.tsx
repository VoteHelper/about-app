import { Badge, Progress } from "@chakra-ui/react";
import { faQuestionCircle } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { BADGE_COLOR, BADGE_INFO } from "../../../constants/settingValue/badge";
import { SCHEME_TO_COLOR } from "../../../constants/styles";
import { getUserBadge } from "../../../helpers/userHelpers";
import BadgeInfoModal from "../../../modals/store/badgeInfoModal/BadgeInfoModal";
import { UserBadge } from "../../../types/user/user";

interface IPointScoreBar {
  myScore: number;
}

function PointScoreBar({ myScore }: IPointScoreBar) {
  const { data: session } = useSession();

  const [userBadge, setUserBadge] = useState<{
    badge: UserBadge;
    nextBadge: UserBadge;
  }>({ badge: null, nextBadge: null });
  const [isBadgeModal, setIsBadgeModal] = useState(false);

  useEffect(() => {
    if (myScore === 0) {
      setUserBadge({ badge: "아메리카노", nextBadge: "라떼" });
      return;
    }
    const { badge, nextBadge } = getUserBadge(myScore, session?.uid as string);
    setUserBadge({ badge, nextBadge });
  }, [myScore, session?.uid]);

  const { badge, nextBadge } = userBadge;

  const badgeColor = BADGE_COLOR[userBadge.badge];

  const getBadgePoint = () => {
    for (let i = 0; i < BADGE_INFO.length; i++) {
      const badgeInfo = BADGE_INFO[i];
      if (badgeInfo.badge === nextBadge) {
        return {
          nextBadgePoint: badgeInfo.minScore,
          badgeGap: nextBadgePoint - BADGE_INFO[i - 1].minScore,
        };
      }
    }
  };
  const { nextBadgePoint, badgeGap } = getBadgePoint() || {};

  return (
    <>
      <Layout>
        <Grade>
          <div>
            <Badge marginRight="var(--margin-md)" colorScheme={badgeColor}>
              {badge}
            </Badge>
            <BadgeName color={SCHEME_TO_COLOR[badgeColor] || badgeColor}>
              {myScore}점
            </BadgeName>
            <IconWrapper onClick={() => setIsBadgeModal(true)}>
              <FontAwesomeIcon icon={faQuestionCircle} size="sm" />
            </IconWrapper>
          </div>
          {nextBadge && (
            <div>
              <BadgeName color={BADGE_COLOR[nextBadge]}>
                {nextBadgePoint}점
              </BadgeName>
              <Badge colorScheme={BADGE_COLOR[nextBadge]} marginLeft="6px">
                {nextBadge}
              </Badge>
            </div>
          )}
        </Grade>
        <Progress
          value={((nextBadgePoint - myScore) / badgeGap) * 100}
          size="xs"
          color="var(--font-h4)"
        />
      </Layout>

      {isBadgeModal && <BadgeInfoModal setIsModal={setIsBadgeModal} />}
    </>
  );
}

const Layout = styled.div`
  margin-bottom: var(--margin-sub);
`;
const Grade = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--margin-sub);
  align-items: center;
  > div {
    display: flex;
    align-items: center;
    > span {
      font-size: 12px;
    }
  }
`;

const BadgeName = styled.span<{ color: string }>`
  color: ${(props) => props.color};
`;

const IconWrapper = styled.div`
  color: var(--font-h2);
  font-size: 14px;
  margin-left: var(--margin-md);
`;

export default PointScoreBar;
