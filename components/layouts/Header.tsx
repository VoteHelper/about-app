import { Box } from "@chakra-ui/react";
import styled from "styled-components";

import ArrowBackButton from "../../components/atoms/buttons/ArrowBackButton";
import Slide from "./PageSlide";
interface IHeader {
  title: string;
  isBack?: boolean;
  url?: string;
  isSlide?: boolean;
  children?: React.ReactNode;
}

export default function Header({ isBack = true, title, isSlide = true, url, children }: IHeader) {
  function HeaderLayout() {
    return (
      <HeaderContainer>
        <LeftSection>
          {isBack ? <ArrowBackButton url={url} /> : <Box w="16px" />}
          <Title>{title}</Title>
        </LeftSection>
        <div>{children}</div>
      </HeaderContainer>
    );
  }

  return (
    <>
      {isSlide ? (
        <Slide isFixed={true}>
          <HeaderLayout />
        </Slide>
      ) : (
        <HeaderLayout />
      )}
    </>
  );
}

const HeaderContainer = styled.header`
  background-color: white;
  height: var(--header-h);
  font-size: 18px;
  padding-right: 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: var(--border);
  max-width: var(--max-width);
  margin: 0 auto;
`;

// Left Section 스타일
const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

// Title 스타일
const Title = styled.div`
  font-weight: 800; /* font-extrabold */
  color: var(--gray-800); /* text-gray-1 - 색상은 예시입니다 */
`;
