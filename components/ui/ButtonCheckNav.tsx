import { Button, ButtonGroup } from "@chakra-ui/react";
import styled from "styled-components";
import { DispatchString } from "../../types/reactTypes";

interface IButtonCheckNav {
  buttonList: string[];
  selectedButton: string;
  setSelectedButton: DispatchString;
}

function ButtonCheckNav({
  buttonList,
  selectedButton,
  setSelectedButton,
}: IButtonCheckNav) {
  return (
    <Layout>
      <ButtonGroup flexWrap="wrap" gap="var(--margin-md)">
        {buttonList.map((item) => (
          <Button
            colorScheme={item === selectedButton ? "mintTheme" : null}
            key={item}
            onClick={() => setSelectedButton(item)}
            ml="0px !important"
            size="sm"
          >
            {item}
          </Button>
        ))}
      </ButtonGroup>
    </Layout>
  );
}

const Layout = styled.div``;

export default ButtonCheckNav;
