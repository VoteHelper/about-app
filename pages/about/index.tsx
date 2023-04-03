import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";
import safeJsonStringify from "safe-json-stringify";
import styled from "styled-components";
import Seo from "../../components/common/Seo";
import AttendChart from "../../components/utils/AttendChart";
import dbConnect from "../../libs/dbConnect";
import { isMember } from "../../libs/utils/authUtils";
import UserSetting from "../../components/UserSetting";
import { User } from "../../models/user";
import { useRecoilValue } from "recoil";
import { voteDateState } from "../../recoil/studyAtoms";
import { useVoteQuery } from "../../hooks/vote/queries";
import { Button, useToast } from "@chakra-ui/react";
import { IParticipation } from "../../types/studyDetails";
import { useState } from "react";
import { arrangeSpace } from "../../libs/utils/studyUtils";
import { ColorRing } from "react-loader-spinner";
import AboutMain from "../../pagesComponents/About/main/study/AboutMain";
import AboutFooter from "../../pagesComponents/About/main/Footer";
import EventBanner from "../../pagesComponents/About/main/EventBanner";
import Header from "../../pagesComponents/About/main/Header";
import Calendar from "../../pagesComponents/About/main/Calendar";
import { IUser } from "../../types/user";
import UserOverview from "../../pagesComponents/About/main/UserOverview";

function About({ UserList }: { UserList: IUser[] }) {
  const toast = useToast();
  const voteDate = useRecoilValue(voteDateState);
  const [participations, setParticipations] = useState([]);

  const { isLoading } = useVoteQuery(voteDate, {
    enabled: true,
    onSuccess(data) {
      const temp: IParticipation[] = arrangeSpace(data.participations);
      setParticipations(temp);
    },

    onError() {
      toast({
        title: "불러오기 실패",
        description: "투표 정보를 불러오지 못 했어요.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    },
  });

  return (
    <>
      <Seo title="About" />

      <UserSetting UserList={UserList} />
      {isLoading ? (
        <Loader>
          <ColorRing
            visible={true}
            height="40"
            width="40"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#ff6b6b", "#fd7b5b", "#ffa500", "#ffeae5", "#00c2b3"]}
          />
        </Loader>
      ) : (
        <>
          <Layout>
            <Header />
            <UserOverview />
            <HrDiv />
            <Calendar />
            <AboutMain participations={participations} />
            <EventBanner />
          </Layout>
          <AboutFooter />
        </>
      )}
    </>
  );
}

const Layout = styled.div``;

const HrDiv = styled.div`
  height: 8px;
  background-color: var(--font-h6);
`;
const Loader = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default About;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }

  await dbConnect();

  const userData = await User.findOne({ uid: session.uid });
  const user = JSON.parse(safeJsonStringify(userData));

  if (!isMember(user?.role)) {
    if (session.role !== user?.role) {
      context.res.setHeader("Set-Cookie", "next-auth.session-token=deleted");

      return {
        redirect: {
          permanent: false,
          destination: "/login?force_signout=true",
        },
      };
    } else {
      return {
        redirect: {
          permanent: false,
          destination: "/forbidden",
        },
      };
    }
  }
  const users = await User.find();
  const UserList = JSON.parse(safeJsonStringify(users));
  return { props: { UserList } };
};
