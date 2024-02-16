import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { DEFAULT_BACK_URL } from "../../constants/system";
import { prevPageUrlState } from "../../recoil/previousAtoms";

interface IHeader {
  title: string;
  url?: string | "back";
  isPrev?: boolean;
  children?: React.ReactNode;
  isNoLine?: boolean;
}

const Header = ({ title, url, children, isNoLine }: IHeader) => {
  const router = useRouter();

  const [prevPageUrl, setPrevPageUrl] = useRecoilState(prevPageUrlState);

  const handleClick = () => {
    if (prevPageUrl) router.push(prevPageUrl);
    setPrevPageUrl(null);
    if (url) {
      if (url === "back") router.back();
      else router.push(`${url}`);
    } else router.push(DEFAULT_BACK_URL);
  };

  return (
    <Layout isNoLine={isNoLine}>
      <IconWrapper onClick={handleClick}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </IconWrapper>
      <Title>{title}</Title>
      <Nav>{children}</Nav>
    </Layout>
  );
};

const Layout = styled.div<{ isNoLine: boolean }>`
  background-color: white;
  height: 52px;
  padding-right: var(--gap-4);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: var(--gray-1);
  border-bottom: ${(props) => !props.isNoLine && "1px solid var(--gray-7)"};
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.04);
`;

const IconWrapper = styled.button`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 var(--gap-4);
`;

const Title = styled.span`
  color: var(--gray-1);

  font-weight: 600;
`;

const Nav = styled.nav`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

export default Header;
