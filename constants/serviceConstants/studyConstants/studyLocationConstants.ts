import { ActiveLocation } from "../../../types/services/locationTypes";
import {
  ANYANG_금정역,
  ANYANG_범계역,
  ANYANG_범계학원가점,
  ANYANG_안양역,
  ANYANG_인덕원역,
  ANYANG_호계점,
  DONG_경희대점,
  DONG_길음역,
  DONG_노원역,
  DONG_동대문역,
  DONG_딥십리역,
  DONG_서울시립대점,
  DONG_석계역,
  DONG_성신여대점,
  DONG_수유역,
  DONG_신설동역,
  DONG_안암역,
  DONG_왕십리역,
  DONG_월곡역,
  DONG_장안동사거리점,
  DONG_중화역,
  DONG_한성대입구역점,
  DONG_혜화역,
  DONG_화랑대역,
  DONG_회기역,
  GANGNAM_강남구청역,
  GANGNAM_강남역,
  GANGNAM_교대법원점,
  GANGNAM_교대역,
  GANGNAM_논현역,
  GANGNAM_도곡동점,
  GANGNAM_선릉역,
  GANGNAM_신논현역,
  INC_구월동점,
  INC_부평점,
  INC_서구청점,
  INC_송도DT점,
  INC_송도점,
  INC_인천대점,
  INC_인하대역점,
  INC_인하대점,
  INC_인하대점2,
  INC_청라점,
  SUWAN_경기대,
  SUWAN_경희대,
  SUWAN_고색역,
  SUWAN_광교,
  SUWAN_광교엘리웨이,
  SUWAN_광교역,
  SUWAN_구운동,
  SUWAN_망포역,
  SUWAN_상현역,
  SUWAN_성균관대역,
  SUWAN_송죽,
  SUWAN_수원시청,
  SUWAN_수원역,
  SUWAN_아주대,
  SUWAN_청년바람지대,
  SUWAN_행궁동,
  YANG_까치산역,
  YANG_당산역,
  YANG_대방역점,
  YANG_등촌역,
  YANG_목동10단지점,
  YANG_목동점,
  YANG_발산역,
  YANG_선유도점,
  YANG_신길역,
  YANG_신도림역,
  YANG_신월동점,
  YANG_신풍역,
  YANG_양천구청역,
  YANG_여의도역,
  YANG_영등포구청역,
  YANG_오목교역,
  YANG_홍대입구역점,
  YANG_화곡DT점,
  YANG_화곡역,
} from "./studyPlaceConstants";

type LocationToPlace = {
  [key in ActiveLocation]: string[];
};

export const LOCATION_TO_PLACE: LocationToPlace = {
  // 전체: [ALL_스터디인증],
  수원: [
    SUWAN_아주대,
    SUWAN_수원시청,
    SUWAN_송죽,
    SUWAN_상현역,
    SUWAN_광교역,
    SUWAN_구운동,
    SUWAN_고색역,
    SUWAN_성균관대역,
    SUWAN_광교엘리웨이,
    SUWAN_망포역,
    SUWAN_행궁동,
    SUWAN_경기대,
    SUWAN_광교,
    SUWAN_경희대,
    SUWAN_수원역,
    SUWAN_청년바람지대,
  ],
  양천: [
    YANG_등촌역,
    YANG_당산역,
    YANG_오목교역,
    YANG_영등포구청역,
    YANG_화곡DT점,
    YANG_신도림역,
    YANG_여의도역,
    YANG_까치산역,
    YANG_양천구청역,
    YANG_신월동점,
    YANG_신길역,
    YANG_신풍역,
    YANG_화곡역,
    YANG_목동점,
    YANG_발산역,
    YANG_선유도점,
    YANG_목동10단지점,
    YANG_홍대입구역점,
    YANG_대방역점,
  ],
  안양: [
    ANYANG_범계역,
    ANYANG_금정역,
    ANYANG_인덕원역,
    ANYANG_안양역,
    ANYANG_범계학원가점,
    ANYANG_호계점,
  ],
  강남: [
    GANGNAM_신논현역,
    GANGNAM_논현역,
    GANGNAM_강남구청역,
    GANGNAM_선릉역,
    GANGNAM_교대역,
    GANGNAM_강남역,
    GANGNAM_도곡동점,
    GANGNAM_교대법원점,
  ],
  동대문: [
    DONG_혜화역,
    DONG_동대문역,
    DONG_성신여대점,
    DONG_길음역,
    DONG_신설동역,
    DONG_안암역,
    DONG_왕십리역,
    DONG_월곡역,
    DONG_서울시립대점,
    DONG_딥십리역,
    DONG_석계역,
    DONG_장안동사거리점,
    DONG_화랑대역,
    DONG_중화역,
    DONG_회기역,
    DONG_경희대점,
    DONG_노원역,
    DONG_수유역,
    DONG_한성대입구역점,
  ],
  인천: [
    INC_구월동점,
    INC_부평점,
    INC_인하대점,
    INC_송도점,
    INC_송도DT점,
    INC_인천대점,
    INC_청라점,
    INC_서구청점,
    INC_인하대역점,
    INC_인하대점2,
  ],
};

export const PLACE_TO_LOCATION = createPlaceToLocationMap(LOCATION_TO_PLACE);

function createPlaceToLocationMap(obj: LocationToPlace) {
  const placeToLocationMap: { [key: string]: ActiveLocation } = {};

  Object.entries(obj).forEach(([location, ids]) => {
    ids.forEach((id) => {
      placeToLocationMap[id] = location as ActiveLocation;
    });
  });
  return placeToLocationMap;
}
