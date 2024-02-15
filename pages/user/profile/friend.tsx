import { Badge } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import ProfileIcon from "../../../components/common/user/Profile/ProfileIcon";
import Header from "../../../components/layout/Header";
import Slide from "../../../components/layout/Slide";
import { BADGE_COLOR } from "../../../constants/settingValue/badge";
import { getUserBadge } from "../../../helpers/userHelpers";
import { useUidsToUsersInfoQuery } from "../../../hooks/user/queries";
import { prevPageUrlState } from "../../../recoil/previousAtoms";
import { transferUserDataState } from "../../../recoil/transferDataAtoms";
import { userInfoState } from "../../../recoil/userAtoms";
import { IUser } from "../../../types/user/user";

function ProfileFriend() {
  const router = useRouter();

  const userInfo = useRecoilValue(userInfoState);
  const setUserData = useSetRecoilState(transferUserDataState);
  const setBeforePage = useSetRecoilState(prevPageUrlState);

  const { data: friends } = useUidsToUsersInfoQuery(userInfo?.friend, {
    enabled: !!userInfo?.friend,
  });

  const onClickUser = (user: IUser) => {
    setUserData(user);
    setBeforePage(router?.asPath);
    router.push(`/profile/${user.uid}`);
  };

  return (
    <Slide>
      <Header title="내 친구 목록" url={`/user/profile`} />
      <Container>
        {friends?.map((who) => {
          const { badge } = getUserBadge(who.score, who.uid);

          return (
            <Item key={who.uid} onClick={() => onClickUser(who)}>
              <ProfileWrapper>
                <ProfileIcon user={who} size="sm" />
              </ProfileWrapper>
              <Info>
                <Name>
                  <span>{who.name}</span>
                  <Badge
                    fontSize={10}
                    colorScheme={BADGE_COLOR[badge]}
                    ml="var(--gap-2)"
                  >
                    {badge}
                  </Badge>
                </Name>
                <div>{who.comment}</div>
              </Info>
            </Item>
          );
        })}
      </Container>
    </Slide>
  );
}

const Container = styled.div`
  margin: 0 var(--gap-4);
`;

const Item = styled.div`
  display: flex;
  padding: var(--gap-3) 0;
  border-top: var(--border-light);
  border-bottom: var(--border-light);
  justify-content: space-between;
  align-items: center;
`;

const ProfileWrapper = styled.div``;

const Info = styled.div`
  height: 38px;
  flex: 1;
  margin-left: var(--gap-3);
  display: flex;

  flex-direction: column;

  justify-content: space-between;
  > div:last-child {
    font-size: 11px;
    color: var(--gray-3);
    display: flex;
    flex-direction: column;
  }
`;

const RestInfo = styled.div`
  > span:first-child {
    margin-right: var(--gap-1);
  }
  > span:nth-child(2) {
    margin-left: var(--gap-1);
  }
`;

const DDay = styled.span`
  color: var(--color-red);
  margin-left: var(--gap-2);
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 13px;
`;

export default ProfileFriend;
