import { useEffect, useRef, useState } from "react";
import {} from "react-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { STUDY_VOTE_ICON } from "../../../constants/settingValue/study";
import { getStudySecondRecommendation } from "../../../helpers/studyHelpers";
import { createNaverMapDot } from "../../../helpers/utilHelpers";
import { useStudyVoteQuery } from "../../../hooks/study/queries";
import { voteDateState } from "../../../recoil/studyAtoms";
import { locationState } from "../../../recoil/userAtoms";
import { IModal } from "../../../types/reactTypes";
import { IStudyParticipate } from "../../../types/study/study";
import { IPlace } from "../../../types/study/studyDetail";
import InitialSetting from "./initialSetting";
import MapBottomNav from "./MapBottomNav";
import MapControlNav from "./MapControlNav";

function StudyVoteMap({ setIsModal }: IModal) {
  const polylinesRef = useRef([]);
  const mapRef = useRef(null);
  const infoRef = useRef(null);
  const markersRef = useRef<{ marker: any; place: IPlace }[]>([]);

  const location = useRecoilValue(locationState);
  const voteDate = useRecoilValue(voteDateState);

  const [naverMap, setNaverMap] = useState(null);
  const [voteInfo, setVoteInfo] = useState<IStudyParticipate>();
  const [twoDistanceSub, setTwoDistanceSub] = useState([]);
  const [isCheckPreSet, setIsCheckPreSet] = useState(false);
  const [precision, setPrecision] = useState(1);

  const { data: voteData } = useStudyVoteQuery(voteDate, location);

  //1지망 투표시 2지망 추천 장소 선택
  useEffect(() => {
    if (!naverMap || !voteData) return;
    if (isCheckPreSet) {
      setIsCheckPreSet(false);
      return;
    }
    if (precision === 0) {
      setVoteInfo((old) => ({ ...old, subPlace: [] }));
      return;
    }
    if (voteInfo?.place) {
      const subPlaceRecommedation = getStudySecondRecommendation(
        voteInfo.place._id,
        1
      );
      const subPlaceTwo = getStudySecondRecommendation(voteInfo.place._id, 2);
      if (precision === 2) {
        subPlaceRecommedation.push(...[...subPlaceTwo]);
        setTwoDistanceSub(subPlaceTwo);
      }
      const subPlace = [];
      voteData.participations.forEach((par) => {
        if (subPlaceRecommedation.includes(par.place._id)) {
          subPlace.push(par.place);
        }
      });
      setVoteInfo((old) => ({ ...old, subPlace: subPlace }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [precision, naverMap, voteData, voteInfo?.place]);

  //투표 정보 바뀌었을때 지도 업데이트
  useEffect(() => {
    const main = voteInfo?.place;
    const subs = voteInfo?.subPlace;

    markersRef.current.forEach((item) => {
      const marker = item.marker;
      const place = item.place;
      const icon =
        main?._id === place._id
          ? STUDY_VOTE_ICON["main"]
          : subs?.map((place) => place._id)?.includes(place._id)
          ? STUDY_VOTE_ICON["sub"]
          : STUDY_VOTE_ICON["default"];
      marker.setIcon({
        content: icon,
        size: new naver.maps.Size(25, 25),
      });
      if (main === place) {
        const findVote = voteData.participations.find(
          (par) => par.place._id === place._id
        );

        const info = new naver.maps.InfoWindow({
          content: `<div style="font-size:12px; padding:2px 4px"><span style="font-weight:600;">${place.brand}</span><br/><span>현재 신청 인원: ${findVote.attendences.length}명</span></div>`,
        });
        if (info.getMap()) info.close();
        info.open(naverMap, marker);
        infoRef.current = info;
      }
    });
    polylinesRef.current.forEach((polyline) => polyline.setMap(null));
    polylinesRef.current = [];
    if (subs && subs.length) {
      subs.forEach((place) => {
        const isTwo = twoDistanceSub.includes(place._id);

        const polyline = new naver.maps.Polyline({
          map: naverMap,
          path: [
            createNaverMapDot(main.latitude, main.longitude),
            createNaverMapDot(place.latitude, place.longitude),
          ],
          strokeColor: isTwo ? "var(--color-red)" : "var(--color-mint)", // 여기에서 폴리라인의 색상을 지정합니다.
          strokeOpacity: 0.8,
          strokeWeight: 3,
        });
        polylinesRef.current.push(polyline);
      });
    }
    if (!main && infoRef?.current) {
      infoRef.current.close();
    }
  }, [markersRef, naverMap, twoDistanceSub, voteData.participations, voteInfo]);

  return (
    <>
      <InitialSetting
        mapRef={mapRef}
        places={voteData?.participations}
        setVoteInfo={setVoteInfo}
        setNaverMap={setNaverMap}
        markersRef={markersRef}
      />
      <Layout>
        <Container>
          <Map id="map" ref={mapRef} />
          <MapControlNav
            naverMap={naverMap}
            setVoteInfo={setVoteInfo}
            setIsCheckPreSet={setIsCheckPreSet}
            precision={precision}
            setPrecision={setPrecision}
          />
        </Container>
        <MapBottomNav
          voteInfo={voteInfo}
          setIsModal={setIsModal}
          setVoteInfo={setVoteInfo}
        />
      </Layout>
    </>
  );
}

const Layout = styled.div`
  position: fixed;
  z-index: 20;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 390px;
  aspect-ratio: 1/1;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const Map = styled.div`
  width: 100%;
  height: 100%;
`;

export default StudyVoteMap;
