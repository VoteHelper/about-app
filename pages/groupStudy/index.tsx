import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import RuleIcon from "../../components/common/Icon/RuleIcon";
import WritingIcon from "../../components/common/Icon/WritingIcon";
import Header from "../../components/layout/Header";
import RuleModal from "../../components/modals/RuleModal";
import ButtonCheckNav from "../../components/templates/ButtonCheckNav";
import CheckBoxNav from "../../components/templates/CheckBoxNav";
import {
  GROUP_STUDY_CATEGORY_ARR,
  GROUP_STUDY_RULE_CONTENT,
  GROUP_STUDY_SUB_CATEGORY,
} from "../../constants/contents/GroupStudyContents";
import { dayjsToStr } from "../../helpers/dateHelpers";
import { shuffleArray } from "../../helpers/utilHelpers";
import { useGroupStudyAllQuery } from "../../hooks/groupStudy/queries";
import { useUserInfoQuery } from "../../hooks/user/queries";
import NotCompletedGroupStudyModal from "../../modals/system/NotCompletedGroupStudyModal";
import GroupStudyBlock from "../../pagesComponents/groupStudy/GroupStudyBlock";
import GroupStudyMine from "../../pagesComponents/groupStudy/GroupStudyMine";
import GroupStudySkeletonMain from "../../pagesComponents/groupStudy/GroupStudySkeletonMain";
import GroupStudySkeletonMine from "../../pagesComponents/groupStudy/GroupStudySkeletonMine";
import { isGuestState, userInfoState } from "../../recoil/userAtoms";
import { IGroupStudy } from "../../types/page/groupStudy";

function Index() {
  const isGuest = useRecoilValue(isGuestState);

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useUserInfoQuery({
    enabled: !userInfo,
    onSuccess(data) {
      setUserInfo(data);
    },
  });

  const [groupStudies, setGroupStudies] = useState<IGroupStudy[]>();
  const [category, setCategory] = useState("전체");
  const [subCategory, setSubCategory] = useState();
  const [myStudies, setMyStudies] = useState([]);

  const [isModal, setIsModal] = useState(false);
  const [isRuleModal, setIsRuleModal] = useState(false);

  const { data: groupStudyAll, isLoading } = useGroupStudyAllQuery();

  useEffect(() => {
    if (localStorage.getItem("groupStudyModal") !== dayjsToStr(dayjs())) {
      localStorage.setItem("groupStudyModal", dayjsToStr(dayjs()));
      setIsModal(true);
    }
  }, []);

  useEffect(() => {
    if (isLoading || !userInfo) return;

    setMyStudies(
      groupStudyAll.filter((item) =>
        item.participants.some((who) => who.user.uid === userInfo.uid)
      )
    );

    const filtered =
      category === "전체"
        ? groupStudyAll
        : groupStudyAll.filter(
            (item) =>
              (item.category.main === category && !subCategory) ||
              item.category.sub === subCategory
          );
    setGroupStudies(shuffleArray(filtered));
  }, [category, groupStudyAll, isLoading, subCategory, userInfo]);

  return (
    <>
      <Layout>
        <Header title="소모임 그룹">
          <RuleIcon setIsModal={setIsRuleModal} />
        </Header>{" "}
        <Title>내 소모임</Title>
        {!groupStudies ? (
          <GroupStudySkeletonMine />
        ) : (
          <GroupStudyMine myStudies={myStudies} />
        )}
        <Title>전체 소모임</Title>
        <NavWrapper>
          <ButtonCheckNav
            buttonList={["전체", ...GROUP_STUDY_CATEGORY_ARR]}
            selectedButton={category}
            setSelectedButton={setCategory}
            isLineBtn={true}
          />
        </NavWrapper>
        <SubNavWrapper>
          <CheckBoxNav
            buttonList={GROUP_STUDY_SUB_CATEGORY[category]}
            selectedButton={subCategory}
            setSelectedButton={setSubCategory}
          />
        </SubNavWrapper>
        <>
          {isLoading ? (
            <GroupStudySkeletonMain />
          ) : (
            <Main>
              {groupStudies
                ?.slice()
                ?.reverse()
                ?.map((groupStudy) => (
                  <GroupStudyBlock
                    groupStudy={groupStudy}
                    key={groupStudy.id}
                  />
                ))}
            </Main>
          )}
        </>
      </Layout>
      {!isGuest && <WritingIcon url="/groupStudy/writing/category/main" />}
      {isModal && <NotCompletedGroupStudyModal setIsModal={setIsModal} />}
      {isRuleModal && (
        <RuleModal
          content={GROUP_STUDY_RULE_CONTENT}
          setIsModal={setIsRuleModal}
        />
      )}
    </>
  );
}
const Title = styled.div`
  background-color: white;
  padding: var(--padding-main);
  font-weight: 600;
  font-size: 18px;
`;
const Layout = styled.div`
  min-height: 100vh;
  background-color: var(--font-h8);
`;

const NavWrapper = styled.div`
  padding: var(--padding-sub) var(--padding-main);
  padding-bottom: 0;
`;

const SubNavWrapper = styled.div``;

const Main = styled.main`
  margin: var(--margin-main);
`;

export default Index;
