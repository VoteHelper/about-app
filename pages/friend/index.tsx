import { faBalanceScale } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../components/layouts/Header";
import FriendRecommend from "../../pagesComponents/friend/FriendRecommend";
import ProfileOverview from "../../pagesComponents/friend/MyProfile";
import { userDataState } from "../../recoil/interactionAtoms";

function Friend() {
  return (
    <>
      <Header title="친구">
        <FontAwesomeIcon icon={faBalanceScale} size="lg" />
      </Header>
      <Layout>
        <ProfileOverview />
        <FriendRecommend />
      </Layout>
    </>
  );
}

const Layout = styled.div``;

export default Friend;
