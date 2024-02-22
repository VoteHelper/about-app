import { ActiveLocation } from "../../../types2/serviceTypes/locationTypes";
import {
  ANYANG_숨맑은집,
  ANYANG_인뎃커피,
  ANYANG_자유신청,
  ANYANG_커피인더스트리,
  ANYANG_파스쿠찌,
  DONG_경희대,
  DONG_길음역,
  DONG_동대문역,
  DONG_딥십리역,
  DONG_서울시립대,
  DONG_석계역,
  DONG_성신여대,
  DONG_신설동역,
  DONG_안암역,
  DONG_왕십리역,
  DONG_월곡역,
  DONG_장안동,
  DONG_혜화역,
  DONG_혜화역2,
  GANGNAM_강남,
  GANGNAM_강남구청,
  GANGNAM_교대,
  GANGNAM_논현,
  GANGNAM_도곡,
  GANGNAM_선릉,
  GANGNAM_신논현,
  GANGNAM_양재,
  GANGNAM_자유신청,
  SUWAN_경기대,
  SUWAN_경희대,
  SUWAN_고색역,
  SUWAN_광교엘리웨이,
  SUWAN_광교중앙역,
  SUWAN_구운동,
  SUWAN_망포역,
  SUWAN_상현역,
  SUWAN_성균관대역,
  SUWAN_송죽,
  SUWAN_수원시청,
  SUWAN_수원역,
  SUWAN_스타벅스,
  SUWAN_아주대,
  SUWAN_자유신청,
  SUWAN_행궁동,
  YANG_몽글,
  YANG_스타벅스,
  YANG_신풍역,
  YANG_위카페,
  YANG_이디야,
  YANG_자유신청,
  YANG_카페꼼마,
  YANG_카페베네,
  YANG_파스쿠찌,
  YANG_할리스,
  YANG_화곡역,
} from "./studyPlaceConstants";

type LocationToPlace = {
  [key in ActiveLocation]: string[];
};

export const LOCATION_TO_PLACE: LocationToPlace = {
  // 전체: [ALL_스터디인증],
  수원: [
    SUWAN_상현역,
    SUWAN_아주대,
    SUWAN_수원역,
    SUWAN_수원시청,
    SUWAN_경희대,
    SUWAN_송죽,
    SUWAN_구운동,
    SUWAN_스타벅스,
    SUWAN_경기대,
    SUWAN_자유신청,
    SUWAN_고색역,
    SUWAN_성균관대역,
    SUWAN_광교엘리웨이,
    SUWAN_행궁동,
    SUWAN_광교중앙역,
    SUWAN_망포역,
  ],
  양천: [
    YANG_이디야,
    YANG_위카페,
    YANG_파스쿠찌,
    YANG_할리스,
    YANG_카페베네,
    YANG_신풍역,
    YANG_스타벅스,
    YANG_몽글,
    YANG_카페꼼마,
    YANG_화곡역,
    YANG_자유신청,
  ],
  안양: [
    ANYANG_숨맑은집,
    ANYANG_인뎃커피,
    ANYANG_커피인더스트리,
    ANYANG_파스쿠찌,
    ANYANG_자유신청,
  ],
  강남: [
    GANGNAM_강남,
    GANGNAM_강남구청,
    GANGNAM_신논현,
    GANGNAM_논현,
    GANGNAM_교대,
    GANGNAM_양재,
    GANGNAM_선릉,
    GANGNAM_도곡,
    GANGNAM_자유신청,
  ],
  동대문: [
    DONG_장안동,
    DONG_석계역,
    DONG_딥십리역,
    DONG_서울시립대,
    DONG_경희대,
    DONG_월곡역,
    DONG_왕십리역,
    DONG_안암역,
    DONG_신설동역,
    DONG_길음역,
    DONG_성신여대,
    DONG_동대문역,
    DONG_혜화역,
    DONG_혜화역2,
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
