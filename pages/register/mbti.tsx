import { useSearchParams } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

import BottomNav from "../../components/layouts/BottomNav";
import ProgressHeader from "../../components/molecules/headers/ProgressHeader";
import { MBTI } from "../../constants/contentsText/ProfileData";
import { REGISTER_INFO } from "../../constants/keys/localStorage";
import RegisterLayout from "../../pageTemplates/register/RegisterLayout";
import RegisterOverview from "../../pageTemplates/register/RegisterOverview";
import { IUserRegisterFormWriting } from "../../types/models/userTypes/userInfoTypes";
import { getLocalStorageObj, setLocalStorageObj } from "../../utils/storageUtils";

function Mbti() {
  const searchParams = useSearchParams();
  const info: IUserRegisterFormWriting = getLocalStorageObj(REGISTER_INFO);

  const [errorMessage, setErrorMessage] = useState("");

  const [mbti, setMbti] = useState(info?.mbti);
  const isProfileEdit = !!searchParams.get("edit");

  const onClickNext = (e) => {
    if (!mbti) {
      e.preventDefault();
      setErrorMessage("항목을 선택해 주세요.");
      return;
    }
    setLocalStorageObj(REGISTER_INFO, { ...info, mbti });
  };

  return (
    <>
      <ProgressHeader title={!isProfileEdit ? "회원가입" : "프로필 수정"} value={50} />

      <RegisterLayout errorMessage={errorMessage}>
        <RegisterOverview>
          <span>MBTI를 선택해 주세요</span>
          <span></span>
        </RegisterOverview>
        <ButtonNav>
          {MBTI?.map((item, idx) => (
            <Button key={idx} $isSelected={mbti === item} onClick={() => setMbti(item)}>
              {item}
            </Button>
          ))}
        </ButtonNav>
      </RegisterLayout>
      <BottomNav onClick={onClickNext} url="/register/major" />
    </>
  );
}

const ButtonNav = styled.nav`
  margin-top: 40px;
  margin-bottom: var(--gap-2);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--gap-2);
`;

const Button = styled.button<{ $isSelected: boolean }>`
  color: ${(props) => (props.$isSelected ? "var(--gray-800)" : "var(--gray-500)")};
  border-radius: var(--rounded-lg);
  flex: 0.49;
  height: 48px;
  font-size: 14px;
  font-weight: ${(props) => props.$isSelected && "600"};
  border: ${(props) => (props.$isSelected ? "var(--border-thick)" : "var(--border)")};
`;

export default Mbti;
