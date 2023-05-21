import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import {
  faHouse,
  faCalendarCheck,
  faClipboard,
  faUsersViewfinder,
  faPeopleRoof,
  faUtensils,
  faSchool,
  faBookOpen,
  faExclamationCircle,
  faIdCard,
  faClipboardCheck,
  faNewspaper,
  faRankingStar,
  faStore,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import Image from "next/image";
import { faPlaystation } from "@fortawesome/free-brands-svg-icons";

function Drawer({
  isDrawer,
  setIsDrawer,
}: {
  setIsDrawer: Dispatch<SetStateAction<boolean>>;
  isDrawer: boolean;
}) {
  const router = useRouter();
  const url = router?.pathname;

  const handleClick = (link) => {
    const src = `/${link}`;
    if (url === src) {
      setIsDrawer(false);
      return;
    }
    router.push(src);
  };

  return (
    <Layout
      initial={{ x: "-100%" }}
      animate={{ x: isDrawer ? 0 : "-100%" }}
      transition={{ duration: 0.3 }}
    >
      <Title>
        <div onClick={() => setIsDrawer(false)}>
          <Image src={`/aboutSm.png`} width={97} height={55} alt="aboutSm2" />
        </div>
        <div></div>
      </Title>
      <Main>
        <NavHome
          pageSelected={url === "/about"}
          onClick={() => handleClick("about")}
        >
          <FontAwesomeIcon icon={faHouse} size="xl" />

          <span>홈</span>
        </NavHome>
        <NavItem
          pageSelected={url === "/record"}
          onClick={() => handleClick("record")}
        >
          <FontAwesomeIcon icon={faCalendarCheck} size="xl" />

          <span>스터디 기록</span>
        </NavItem>
        <NavLevelItem
          pageSelected={url === "/ranking"}
          onClick={() => handleClick("ranking")}
          style={{ marginLeft: "1px" }}
        >
          <FontAwesomeIcon icon={faRankingStar} size="xl" />

          <span>랭킹</span>
        </NavLevelItem>
        <NavLevelItem
          pageSelected={url === "/store"}
          onClick={() => handleClick("store")}
          style={{ marginLeft: "3px" }}
        >
          <FontAwesomeIcon icon={faStore} size="xl" />

          <span>포인트 추첨</span>
        </NavLevelItem>
        {/* <NavLevelItem
          pageSelected={url === "/friend"}
          onClick={() => handleClick("friend")}
          style={{ marginLeft: "3px" }}
        >
          <FontAwesomeIcon icon={faUserGroup} size="xl" />

          <span>친구</span>
        </NavLevelItem>
        <NavLevelItem
          pageSelected={url === "/gather"}
          onClick={() => handleClick("gather")}
          style={{ marginLeft: "4px" }}
        >
          <FontAwesomeIcon icon={faPlaystation} size="xl" />

          <span style={{ marginLeft: "10px" }}>모임</span>
        </NavLevelItem> */}
      </Main>
    </Layout>
  );
}

const Layout = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 100vh;
  background-color: white;
  z-index: 10;

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  padding-top: 8px;
  padding-left: 14px;
  display: flex;
  justify-content: space-between;

  > div:first-child {
  }
  > div:last-child {
    margin-top: 14px;
    margin-right: 24px;
    color: var(--font-h3);
  }
`;

const Main = styled.main`
  padding: 16px;
  padding-top: 12px;
`;
const NavItem = styled.div<{ pageSelected: boolean }>`
  color: var(--font-h2);
  padding-left: 3px;
  margin-bottom: 36px;
  > span {
    margin-left: 14px;
    font-size: 15px;
  }
`;
const NavHome = styled.div<{ pageSelected: boolean }>`
  color: ${(props) => (props.pageSelected ? "var(--font-h1)" : "#565b679f")};
  padding-left: 1px;
  margin-bottom: 36px;
  > span {
    margin-left: 11px;
    font-size: 15px;
  }
`;

const NavLevelItem = styled.div<{ pageSelected: boolean }>`
  color: var(--font-h2);

  margin-bottom: 36px;
  > span {
    margin-left: 8px;
    font-size: 15px;
  }
`;

export default Drawer;
