import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { Input } from "../../../components/atoms/Input";
import BottomNav from "../../../components/layouts/BottomNav";
import Header from "../../../components/layouts/Header";
import Slide from "../../../components/layouts/PageSlide";
import ProgressStatus from "../../../components/molecules/ProgressStatus";
import LocationSearch from "../../../components/organisms/location/LocationSearch";
import { useFailToast } from "../../../hooks/custom/CustomToast";
import RegisterLayout from "../../../pageTemplates/register/RegisterLayout";
import RegisterOverview from "../../../pageTemplates/register/RegisterOverview";
import { sharedGatherWritingState } from "../../../recoils/sharedDataAtoms";
import { KakaoLocationProps } from "../../../types/externals/kakaoLocationSearch";

function WritingGahterLocation() {
  const router = useRouter();
  const failToast = useFailToast();

  const [gatherWriting, setGatherWriting] = useRecoilState(sharedGatherWritingState);

  const [placeInfo, setPlaceInfo] = useState<KakaoLocationProps>({
    place_name: gatherWriting?.location?.main || "",
    road_address_name: gatherWriting?.location?.sub || "",
  });

  const onClickNext = () => {
    if (!location) {
      failToast("free", "장소를 선택해 주세요!", true);
      return;
    }
    setGatherWriting((old) => ({
      ...old,
      location: {
        main: placeInfo.place_name,
        sub: placeInfo.road_address_name,
      },
    }));
    router.push(`/gather/writing/condition`);
  };
  console.log("place", placeInfo);
  return (
    <>
      <Slide isFixed={true}>
        <ProgressStatus value={80} />
        <Header isSlide={false} title="" url="/gather/writing/date" />
      </Slide>
      <RegisterLayout>
        <RegisterOverview>
          <span>날짜와 장소를 선택해 주세요.</span>
        </RegisterOverview>
        <Location>
          <LocationSearch info={placeInfo} setInfo={setPlaceInfo} />
          <Box mt="20px">
            <Input
              placeholder="상세 주소"
              value={placeInfo.road_address_name}
              onChange={(e) =>
                setPlaceInfo((old) => ({ ...old, road_address_name: e.target.value }))
              }
              size="sm"
            />
          </Box>
        </Location>
      </RegisterLayout>
      <BottomNav onClick={() => onClickNext()} />
    </>
  );
}

const Location = styled.div`
  margin-top: var(--gap-3);
  background-color: inherit;
`;

export default WritingGahterLocation;
