import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import WritingIcon from "../../components/common/Icon/WritingIcon";
import ButtonCheckNav from "../../components/templates/ButtonCheckNav";
import { LOCATION_USE_ALL } from "../../constants/location";
import GatherHeader from "../../pagesComponents/gather/GatherHeader";
import GatherMain from "../../pagesComponents/gather/GatherMain";
import GatherReviewNav from "../../pagesComponents/gather/GatherReviewNav";
import { isGuestState } from "../../recoil/userAtoms";
import { LocationFilterType } from "../../types/system";

function Gather() {
  const isGuest = useRecoilValue(isGuestState);
  const [category, setCategory] = useState<LocationFilterType>("전체");

  return (
    <>
      <GatherHeader />
      <Layout>
        <GatherReviewNav />
        <HrDiv />
        <Wrapper>
          <ButtonCheckNav
            buttonList={["전체", ...LOCATION_USE_ALL]}
            selectedButton={category}
            setSelectedButton={setCategory}
          />
        </Wrapper>
        <GatherMain category={category} />
        {!isGuest && <WritingIcon url="/gather/writing/category" />}
      </Layout>
    </>
  );
}

const Layout = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
  margin: 0 var(--margin-main);
  padding: var(--padding-sub) 0;
  border-bottom: 1px solid var(--font-h6);
`;

const HrDiv = styled.div`
  height: 8px;
  background-color: var(--font-h56);
`;

export default Gather;
