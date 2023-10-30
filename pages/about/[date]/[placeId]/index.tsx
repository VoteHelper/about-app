import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { ALPHABET_COLLECTION } from "../../../../constants/contentsValue/collection";
import AlphabetModal from "../../../../modals/common/AlphabetModal";
import StudySpaceVoteOverview from "../../../../pagesComponents/about/studySpace/SpaceSpaceVoteOverview";
import StudySpaceCover from "../../../../pagesComponents/about/studySpace/StudySpaceCover";
import StudySpaceHeader from "../../../../pagesComponents/about/studySpace/StudySpaceHeader";
import StudySpaceNavigation from "../../../../pagesComponents/about/studySpace/StudySpaceNavigation";
import StudySpaceOverview from "../../../../pagesComponents/about/studySpace/StudySpaceOverView";
import StudySpaceSetting from "../../../../pagesComponents/about/studySpace/StudySpaceSetting";
import StudySpaceSkeleton from "../../../../pagesComponents/about/studySpace/StudySpaceSkeleton";
import StudyTimeTable from "../../../../pagesComponents/about/studySpace/StudySpaceTable";
import StudySpaceUserComments from "../../../../pagesComponents/about/studySpace/studySpaceUserComments/StudySpaceUserComments";
import { studyDateStatusState } from "../../../../recoil/studyAtoms";
import {
  transferAlphabetState,
  transferStudySpaceDataState,
} from "../../../../recoil/transferDataAtoms";
import { isGuestState } from "../../../../recoil/userAtoms";
import { STUDY_SPACE_INFO } from "../../../../storage/study";
import { IParticipation } from "../../../../types/study/studyDetail";

const IMAGE_ARRAY_LENGTH = 6;

function StudySpace() {
  const isGuest = useRecoilValue(isGuestState);
  const transferStudySpaceData = useRecoilValue(transferStudySpaceDataState);
  const [transferAlphabet, setTransferAlphabet] = useRecoilState(
    transferAlphabetState
  );
  const studyDateStatus = useRecoilValue(studyDateStatusState);

  const [participation, setParticipation] = useState<IParticipation>(
    transferStudySpaceData
  );

  const [randomNum] = useState(() =>
    Math.floor(Math.random() * IMAGE_ARRAY_LENGTH)
  );

  const isPrivate = participation?.place.brand === "자유 신청";

  const { place, attendences, status } = participation || {};

  const filtered =
    studyDateStatus === "not passed"
      ? attendences
      : attendences?.filter((who) => who.firstChoice);

  const info = STUDY_SPACE_INFO.find((info) => info.id === place?._id);
  const coverImageUrl =
    info && (info?.image || `/studyRandom/study${randomNum + 1}.jpg`);
  const absences = participation?.absences;

  return (
    <>
      <StudySpaceSetting
        participation={participation}
        setParticipation={setParticipation}
      />
      {participation ? (
        <>
          <Layout>
            <StudySpaceHeader title={place.brand} place={place} />
            <StudySpaceCover
              coverImageUrl={coverImageUrl}
              logoImageUrl={place.image}
            />
            {!isPrivate && <StudySpaceOverview place={place} info={info} />}
            <StudySpaceVoteOverview
              voteCnt={filtered.length}
              place={place}
              status={status}
              isPrivate={isPrivate}
            />
            {!isPrivate && <StudyTimeTable attendances={filtered} />}
            <StudySpaceUserComments
              attendances={filtered}
              absences={absences}
              isPrivate={isPrivate}
            />
            {!isGuest ? (
              <StudySpaceNavigation
                place={place}
                attendences={filtered}
                status={status}
                isPrivate={isPrivate}
              />
            ) : (
              <Spacer />
            )}
          </Layout>
        </>
      ) : (
        <StudySpaceSkeleton coverImageUrl={coverImageUrl} />
      )}
      {transferAlphabet && (
        <AlphabetModal
          setIsModal={() => setTransferAlphabet(null)}
          alphabet={transferAlphabet}
        />
      )}
    </>
  );
}

const Layout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Spacer = styled.div`
  height: 60px;
`;

export default StudySpace;
