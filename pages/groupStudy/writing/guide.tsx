import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import BottomNav from "../../../components/layout/BottomNav";
import Header from "../../../components/layout/Header";
import PageSlide from "../../../components/layout/PageSlide";
import ProgressStatus from "../../../components/templates/ProgressStatus";
import { useFailToast } from "../../../hooks/custom/CustomToast";
import RegisterLayout from "../../../pageTemplates/register/RegisterLayout";
import RegisterOverview from "../../../pageTemplates/register/RegisterOverview";
import { sharedGroupStudyWritingState } from "../../../recoil/sharedDataAtoms";

function GroupStudyWritingGuide() {
  const router = useRouter();
  const failToast = useFailToast();

  const [groupStudy, setGroupStudy] = useRecoilState(
    sharedGroupStudyWritingState
  );

  //초기 input 세팅
  const [title, setTitle] = useState(groupStudy?.title || "");
  const [guide, setGuide] = useState(groupStudy?.guide || "");

  const onClickNext = () => {
    if (!title || !guide) {
      failToast("free", "내용을 작성해 주세요!", true);
      return;
    }

    setGroupStudy((old) => ({
      ...old,
      title,
      guide,
    }));
    router.push(`/groupStudy/writing/content`);
  };

  return (
    <PageSlide>
      <ProgressStatus value={42} />
      <Header title="" url="/groupStudy/writing/category/sub" />
      <RegisterLayout>
        <RegisterOverview>
          <span>짧은 소개글을 작성해주세요! (내용, 진행 방식)</span>
          <span>스터디 소개에 가장 먼저 노출됩니다.</span>
        </RegisterOverview>
        <Container>
          <TitleInput
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Guide
            placeholder="간단하게 작성해주세요."
            value={guide}
            onChange={(e) => setGuide(e.target.value)}
          />
        </Container>
        <BottomNav onClick={() => onClickNext()} />
      </RegisterLayout>
    </PageSlide>
  );
}

const Container = styled.div``;

const TitleInput = styled.input`
  margin-top: var(--margin-max);
  padding-left: var(--padding-min);
  border-bottom: var(--border-thick);
  width: 100%;
  height: 40px;
  background-color: inherit;
  outline: none;
  font-size: 15px;
  font-weight: 600;
  ::placeholder {
    color: var(--font-h4);
  }
`;

const Guide = styled.textarea`
  margin-top: 40px;
  border: var(--border-main);
  border-radius: var(--border-radius-sub);
  height: 120px;
  width: 100%;
  padding: var(--padding-sub);
  font-size: 12px;
  :focus {
    outline: none;
    border: var(--border-focus);
  }
`;

export default GroupStudyWritingGuide;
