import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const XAlertIcon = () => (
  <XAleftIconLayout>
    <FontAwesomeIcon icon={faXmark} color="white" size="3x" />
  </XAleftIconLayout>
);

const XAleftIconLayout = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: var(--color-mint);
  display: flex;
  justify-content: center;
  align-items: center;
`;
