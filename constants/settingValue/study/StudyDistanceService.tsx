import {
  ANYANG_범계학원가,
  ANYANG_숨맑은집,
  ANYANG_인뎃커피,
  ANYANG_커피인더스트리,
  ANYANG_파스쿠찌,
  ANYANG_호계,
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
  GANGNAM_강남,
  GANGNAM_강남구청,
  GANGNAM_교대,
  GANGNAM_논현,
  GANGNAM_도곡,
  GANGNAM_선릉,
  GANGNAM_신논현,
  GANGNAM_양재,
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
  SUWAN_아주대,
  SUWAN_행궁동,
  YANG_몽글,
  YANG_스타벅스,
  YANG_신길역,
  YANG_신월동,
  YANG_신풍역,
  YANG_양천구청역,
  YANG_위카페,
  YANG_이디야,
  YANG_카페꼼마,
  YANG_카페베네,
  YANG_파스쿠찌,
  YANG_할리스,
  YANG_화곡역,
} from "../../../storage/study";

//15 //25
export const STUDY_DISTANCE = {
  수원: {
    1: [
      [SUWAN_수원시청, SUWAN_수원역],
      [SUWAN_수원시청, SUWAN_망포역],
      [SUWAN_수원시청, SUWAN_아주대],
      [SUWAN_수원시청, SUWAN_고색역],
      [SUWAN_수원역, SUWAN_고색역],
      [SUWAN_수원역, SUWAN_성균관대역],
      [SUWAN_수원역, SUWAN_행궁동],

      [SUWAN_수원역, SUWAN_구운동],
      [SUWAN_경희대, SUWAN_망포역],
      [SUWAN_아주대, SUWAN_경기대],
      [SUWAN_아주대, SUWAN_광교중앙역],
      [SUWAN_아주대, SUWAN_광교엘리웨이],
      [SUWAN_아주대, SUWAN_행궁동],
      [SUWAN_아주대, SUWAN_상현역],
      [SUWAN_경기대, SUWAN_광교중앙역],
      [SUWAN_경기대, SUWAN_행궁동],
      [SUWAN_경기대, SUWAN_상현역],
      [SUWAN_구운동, SUWAN_고색역],
      [SUWAN_구운동, SUWAN_성균관대역],
      [SUWAN_상현역, SUWAN_광교중앙역],
      [SUWAN_상현역, SUWAN_경기대],
      [SUWAN_상현역, SUWAN_광교엘리웨이],
      [SUWAN_광교엘리웨이, SUWAN_광교중앙역],
      [SUWAN_송죽, SUWAN_행궁동],
      [SUWAN_송죽, SUWAN_성균관대역],
    ],
    2: [
      [SUWAN_고색역, SUWAN_성균관대역],
      [SUWAN_고색역, SUWAN_망포역],
      [SUWAN_수원시청, SUWAN_행궁동],
      [SUWAN_수원시청, SUWAN_경희대],
      [SUWAN_수원역, SUWAN_망포역],
      [SUWAN_수원시청, SUWAN_광교엘리웨이],
      [SUWAN_수원시청, SUWAN_광교중앙역],
      [SUWAN_아주대, SUWAN_수원역],
      [SUWAN_아주대, SUWAN_송죽],
      [SUWAN_수원역, SUWAN_송죽],
      [SUWAN_성균관대역, SUWAN_행궁동],
      [SUWAN_고색역, SUWAN_행궁동],
      [SUWAN_망포역, SUWAN_광교엘리웨이],
      [SUWAN_경희대, SUWAN_광교엘리웨이],
      [SUWAN_광교엘리웨이, SUWAN_경기대],
      [SUWAN_구운동, SUWAN_행궁동],
      [SUWAN_구운동, SUWAN_수원시청],
      [SUWAN_구운동, SUWAN_송죽],
      [SUWAN_행궁동, SUWAN_광교중앙역],
      [SUWAN_상현역, SUWAN_행궁동],
    ],
  },
  안양: {
    1: [
      [ANYANG_숨맑은집, ANYANG_범계학원가],
      [ANYANG_숨맑은집, ANYANG_인뎃커피],
      [ANYANG_숨맑은집, ANYANG_커피인더스트리],
      [ANYANG_숨맑은집, ANYANG_호계],
      [ANYANG_파스쿠찌, ANYANG_커피인더스트리],
      [ANYANG_호계, ANYANG_커피인더스트리],
      [ANYANG_호계, ANYANG_범계학원가],
    ],
    2: [
      [ANYANG_숨맑은집, ANYANG_파스쿠찌],
      [ANYANG_파스쿠찌, ANYANG_호계],
      [ANYANG_인뎃커피, ANYANG_호계],
      [ANYANG_파스쿠찌, ANYANG_범계학원가],
      [ANYANG_파스쿠찌, ANYANG_인뎃커피],
      [ANYANG_커피인더스트리, ANYANG_범계학원가],
      [ANYANG_커피인더스트리, ANYANG_인뎃커피],
      [ANYANG_인뎃커피, ANYANG_범계학원가],
    ],
  },
  양천: {
    1: [
      [YANG_신월동, YANG_파스쿠찌],
      [YANG_화곡역, YANG_파스쿠찌],
      [YANG_화곡역, YANG_스타벅스],
      [YANG_화곡역, YANG_위카페],
      [YANG_화곡역, YANG_신월동],

      [YANG_파스쿠찌, YANG_양천구청역],
      [YANG_파스쿠찌, YANG_이디야],
      [YANG_파스쿠찌, YANG_스타벅스],
      [YANG_양천구청역, YANG_이디야],
      [YANG_양천구청역, YANG_몽글],
      [YANG_스타벅스, YANG_이디야],
      [YANG_스타벅스, YANG_위카페],
      [YANG_이디야, YANG_카페베네],
      [YANG_카페베네, YANG_몽글],
      [YANG_카페베네, YANG_할리스],
      [YANG_카페베네, YANG_신길역],
      [YANG_몽글, YANG_신길역],
      [YANG_몽글, YANG_신풍역],
      [YANG_신풍역, YANG_신길역],
      [YANG_신길역, YANG_카페꼼마],
      [YANG_할리스, YANG_몽글],
      [YANG_위카페, YANG_할리스],
    ],
    2: [
      [YANG_화곡역, YANG_양천구청역],
      [YANG_화곡역, YANG_이디야],
      [YANG_할리스, YANG_카페꼼마],
      [YANG_이디야, YANG_할리스],
      [YANG_신월동, YANG_스타벅스],
      [YANG_신월동, YANG_이디야],
      [YANG_신월동, YANG_양천구청역],
      [YANG_할리스, YANG_신길역],
      [YANG_파스쿠찌, YANG_위카페],
      [YANG_파스쿠찌, YANG_몽글],

      [YANG_파스쿠찌, YANG_카페베네],
      [YANG_양천구청역, YANG_스타벅스],
      [YANG_양천구청역, YANG_카페베네],
      [YANG_양천구청역, YANG_할리스],
      [YANG_스타벅스, YANG_카페베네],
      [YANG_위카페, YANG_이디야],
      [YANG_이디야, YANG_신길역],
      [YANG_신풍역, YANG_카페꼼마],
      [YANG_카페베네, YANG_카페꼼마],
    ],
  },
  강남: {
    1: [
      [GANGNAM_교대, GANGNAM_강남],
      [GANGNAM_교대, GANGNAM_양재],
      [GANGNAM_교대, GANGNAM_도곡],
      [GANGNAM_교대, GANGNAM_선릉],
      [GANGNAM_강남, GANGNAM_논현],
      [GANGNAM_강남, GANGNAM_신논현],
      [GANGNAM_강남, GANGNAM_선릉],
      [GANGNAM_강남, GANGNAM_양재],
      [GANGNAM_강남, GANGNAM_논현],

      [GANGNAM_양재, GANGNAM_논현],
      [GANGNAM_양재, GANGNAM_신논현],
      [GANGNAM_논현, GANGNAM_신논현],
      [GANGNAM_논현, GANGNAM_강남구청],
      [GANGNAM_양재, GANGNAM_도곡],
      [GANGNAM_강남, GANGNAM_도곡],
      [GANGNAM_선릉, GANGNAM_강남구청],
    ],
    2: [
      [GANGNAM_신논현, GANGNAM_강남구청],
      [GANGNAM_양재, GANGNAM_선릉],
      [GANGNAM_선릉, GANGNAM_도곡],

      [GANGNAM_선릉, GANGNAM_논현],

      [GANGNAM_선릉, GANGNAM_신논현],
      [GANGNAM_신논현, GANGNAM_도곡],

      [GANGNAM_강남, GANGNAM_강남구청],
      [GANGNAM_교대, GANGNAM_논현],
      [GANGNAM_교대, GANGNAM_신논현],
    ],
  },
  동대문: {
    1: [
      [DONG_혜화역, DONG_동대문역],
      [DONG_혜화역, DONG_성신여대],
      [DONG_혜화역, DONG_신설동역],
      [DONG_혜화역, DONG_길음역],
      [DONG_동대문역, DONG_왕십리역],
      [DONG_동대문역, DONG_성신여대],
      [DONG_동대문역, DONG_신설동역],
      [DONG_동대문역, DONG_안암역],

      [DONG_성신여대, DONG_길음역],
      [DONG_성신여대, DONG_월곡역],
      [DONG_성신여대, DONG_안암역],
      [DONG_길음역, DONG_월곡역],
      [DONG_길음역, DONG_석계역],
      [DONG_길음역, DONG_안암역],
      [DONG_월곡역, DONG_석계역],
      [DONG_월곡역, DONG_경희대],
      [DONG_월곡역, DONG_서울시립대],
      [DONG_신설동역, DONG_안암역],
      [DONG_신설동역, DONG_왕십리역],
      [DONG_신설동역, DONG_서울시립대],
      [DONG_신설동역, DONG_경희대],
      [DONG_신설동역, DONG_딥십리역],
      [DONG_안암역, DONG_서울시립대],
      [DONG_안암역, DONG_경희대],
      [DONG_안암역, DONG_월곡역],
      [DONG_안암역, DONG_석계역],
      [DONG_왕십리역, DONG_딥십리역],
      [DONG_왕십리역, DONG_서울시립대],
      [DONG_왕십리역, DONG_경희대],
      [DONG_경희대, DONG_서울시립대],
      [DONG_서울시립대, DONG_딥십리역],
      [DONG_서울시립대, DONG_장안동],
      [DONG_서울시립대, DONG_석계역],
      [DONG_딥십리역, DONG_장안동],
    ],
    2: [
      [DONG_혜화역, DONG_안암역],
      [DONG_혜화역, DONG_왕십리역],
      [DONG_동대문역, DONG_월곡역],

      [DONG_동대문역, DONG_딥십리역],
      [DONG_동대문역, DONG_서울시립대],
      [DONG_성신여대, DONG_석계역],
      [DONG_성신여대, DONG_딥십리역],
      [DONG_성신여대, DONG_왕십리역],
      [DONG_길음역, DONG_경희대],
      [DONG_길음역, DONG_서울시립대],
      [DONG_신설동역, DONG_장안동],
      [DONG_신설동역, DONG_길음역],
      [DONG_신설동역, DONG_월곡역],
      [DONG_신설동역, DONG_석계역],
      [DONG_안암역, DONG_왕십리역],
      [DONG_안암역, DONG_딥십리역],
      [DONG_왕십리역, DONG_장안동],
      [DONG_경희대, DONG_석계역],
      [DONG_경희대, DONG_장안동],
      [DONG_경희대, DONG_장안동],
      [DONG_경희대, DONG_딥십리역],
    ],
  },
};
