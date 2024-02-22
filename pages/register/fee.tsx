import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "styled-components";
import BottomNav from "../../components/layout/BottomNav";

import Accordion from "../../components/templates/Accordion";
import ProgressHeader from "../../components2/molecules/headers/ProgressHeader";
import { ACCORDION_CONTENT_FEE } from "../../constants/contents/accordionContents";
import { REGISTER_INFO } from "../../constants/keys/localStorage";
import {
  getLocalStorageObj,
  setLocalStorageObj,
} from "../../helpers/storageHelpers";
import { useErrorToast } from "../../hooks/custom/CustomToast";
import {
  useUserInfoFieldMutation,
  useUserRegisterMutation,
} from "../../hooks/user/mutations";
import RegisterCost from "../../pageTemplates/register/fee/RegisterCost";
import RegisterLayout from "../../pageTemplates/register/RegisterLayout";
import RegisterOverview from "../../pageTemplates/register/RegisterOverview";

function Fee() {
  const { data: session, update } = useSession();
  const errorToast = useErrorToast();
  const router = useRouter();

  const info = getLocalStorageObj(REGISTER_INFO);

  const { mutate: changeRole } = useUserInfoFieldMutation("role");

  const { mutate } = useUserRegisterMutation({
    onSuccess() {
      changeRole({ role: "waiting" });
      setLocalStorageObj(REGISTER_INFO, null);
      router.push(`/register/success`);
    },
    onError: errorToast,
  });

  const onClickNext = () => {
    mutate(info);
  };

  return (
    <>
      <ProgressHeader title="회원가입" value={100} />
      <RegisterLayout>
        <RegisterOverview>
          <span>회비 납부</span>
          <span>보증금은 회원 탈퇴시 환급해드려요!</span>
        </RegisterOverview>
        <Cost>
          <div>
            <RegisterCost />
          </div>
        </Cost>
        <Account>운영진에게 연락을 받은 후 납부해야 할 금액입니다!</Account>
        <Message>현재 페이지에서는 가입 신청만 진행됩니다.</Message>
        <Telephone>
          <span>연락받을 연락처:</span> {info?.telephone}
          <Message>연락처를 한번 더 확인해 주세요!</Message>
        </Telephone>
        <Accordion contentArr={ACCORDION_CONTENT_FEE} />
      </RegisterLayout>
      <BottomNav onClick={onClickNext} text="신청완료" />
    </>
  );
}

const Cost = styled.div`
  margin: var(--gap-5) 0;
  > div:first-child {
    color: var(--gray-2);
    font-size: 13px;
    margin-bottom: var(--gap-3);
  }
  > div:last-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const Account = styled.div`
  margin-bottom: var(--gap-1);
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-1);
`;

const Message = styled.div`
  font-size: 13px;
  color: var(--gray-3);
  margin-bottom: 40px;
`;

const Telephone = styled.div`
  > span:first-child {
    font-size: 14px;
    display: inline-block;
    font-weight: 600;
    color: var(--gray-1);
    margin-bottom: var(--gap-1);
  }
`;

export default Fee;
