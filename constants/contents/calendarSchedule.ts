export interface CalendarContentProps {
  content: string;
  start: number;
  end: number;
  type?: "event" | "schedule" | "main";
  text?: string;
  blockIdx?: number;
  color?: string;
  textPosition?: "start" | "end";
}

export const EVENT_CONTENT_2023: Record<string, CalendarContentProps[]> = {
  10: [
    {
      content: "[10월] 에타 홍보 이벤트 추첨",
      start: 22,
      end: 24,
      type: "event",
      text: "에타에 동아리 홍보글을 올려주시면 100 포인트와 추첨을 통해 치킨 기프티콘을 드려요!",
    },
    {
      content: "[시험기간] 랜덤선물 이벤트",
      start: 16,
      end: 22,
      type: "event",
      text: "항상 돌아오는 시험기간 파이팅 이벤트... 매일 단톡방에서 랜덤한 선착순 선물을 뿌립니다!",
    },
    {
      content: "[시험기간] 스터디 투표 2배 이벤트 ",
      start: 16,
      end: 22,
      type: "event",
      text: "시험 기간에 스터디에 투표하면 점수를 2배로 받아요!",
    },
    {
      content: "[오프라인] 번개 이벤트",
      start: 29,
      end: 31,
      type: "event",
      text: "진행 예정",
    },
  ],
  11: [
    {
      content: "수원/안양 정기모임",
      start: 17,
      end: 18,
      type: "schedule",
      text: "정기모임",
    },
    {
      content: "양천/강남",
      start: 18,
      end: 18,
      type: "schedule",
      text: "정기모임",
    },
    {
      content: "정기 모임",
      start: 19,
      end: 19,
      type: "schedule",
      text: "정기모임",
      blockIdx: 1,
    },
    {
      content: "11월 홍보 이벤트 당첨자 선별",
      start: 26,
      end: 30,
      type: "event",
      text: "11월 홍보 이벤트 당첨자 선별",
    },
  ],
  12: [
    {
      content: "시험 기간 이벤트",
      start: 4,
      end: 8,
      type: "event",
      text: "이벤트",
    },
    {
      content: "홍보 이벤트 추첨",
      start: 22,
      end: 24,
      type: "event",
      text: "이벤트",
    },
    {
      content: "수원/강남 펭귄 핫팩",
      start: 17,
      end: 31,
      type: "event",
      text: "이벤트",
    },
  ],
};

export const EVENT_CONTENT_2024: Record<string, CalendarContentProps[]> = {
  6: [
    {
      content: "시험기간 응원 선물 이벤트",
      start: 10,
      end: 14,
      type: "event",
      text: "시험기간 응원 기념으로 매일 단톡방에서 기프티콘을 뿌립니다!",
    },
    {
      content: "동아리 1차 용인 MT",
      start: 25,
      end: 26,
      type: "schedule",
      text: "",
    },
    {
      content: "모임 활성화 이벤트",
      start: 19,
      end: 20,
      type: "event",
      text: "이제 종강하고 동아리 내에서 본격적으로 다양한 모임을 진행해보려고 하는데요! 모임을 개최하고 진행해주시는 분께는 매번 5000원의 지원금을 드립니다!",
    },
    {
      content: "소모임 개설 기간",
      start: 24,
      end: 30,
      type: "main",
      text: "방학동안 스터디 뿐만 아니라 다양한 장르의 그룹을 활성화 해보려고 해요! 토익, 자격증 등의 스터디 뿐만 아니라 카페 탐방, 영화 관람, 보드게임, 러닝, 취미 활동 등 모든 모임 개설이 가능합니다. 모임장에게는 2만원씩 지원 혜택이 있습니다.",
    },
    {
      content: "홍보 이벤트",
      start: 24,
      end: 30,
      type: "event",
      text: "에타 홍보에 참여하고 상품 받아가세요! 총 10만원 쏩니다!",
    },
  ],
  7: [
    {
      content: "동아리 2차 대성리 MT",
      start: 3,
      end: 4,
      type: "schedule",
      text: "",
    },
    {
      content: "소모임 편성",
      start: 6,
      end: 7,
      type: "main",
      text: "",
    },
    {
      content: "모임 활성화 이벤트",
      start: 8,
      end: 9,
      type: "event",
      text: "",
    },
    {
      content: "알고리즘 공모전",
      start: 11,
      end: 12,
      type: "event",
      text: "",
    },
    {
      content: "정기모임 진행 주간",
      start: 18,
      end: 21,
      type: "schedule",
      text: "",
    },
    {
      content: "라운지 및 피드, 채팅, 인스타 기능 출시",
      start: 28,
      end: 31,
      type: "main",
      text: "",
    },
  ],

  8: [
    {
      content: "월간 체크",
      start: 1,
      end: 1,
      type: "main",
      text: "",
    },
    {
      content: "조모임 진행 주간",
      start: 8,
      end: 11,
      type: "schedule",
      text: "",
    },
    {
      content: "커뮤니티 출시",
      start: 5,
      end: 6,
      type: "main",
      text: "",
    },
    {
      content: "에브리타임 홍보 이벤트 시작 ~ ",
      start: 13,
      end: 15,
      type: "event",
      text: "",
    },
    {
      content: "지역 정기모임 주간",
      start: 14,
      end: 17,
      type: "schedule",
      text: "",
    },

    {
      content: "온라인 스터디 오픈",
      start: 20,
      end: 22,
      type: "main",
      text: "",
    },
    {
      content: "추억의 뽑기 이벤트",
      start: 22,
      end: 23,
      type: "event",
      text: "",
    },
    {
      content: "동아리 정비 기간",
      start: 26,
      end: 30,
      type: "schedule",
      text: "",
    },
    {
      content: "한줄 카피라이팅 이벤트",
      start: 28,
      end: 30,
      type: "event",
      text: "",
    },
  ],
  9: [
    {
      content: "동아리 리뉴얼 ~ ",
      start: 2,
      end: 4,
      type: "main",
      text: "에브리타임에 홍보하면 매주 2분께 올리브영 기프티콘을 드려요!",
    },
    {
      content: "에타 홍보 이벤트 ~ ",
      start: 4,
      end: 6,
      type: "event",
      text: "에브리타임에 홍보하면 매주 2분께 올리브영 기프티콘을 드려요!",
    },
    {
      content: "디스코드 오픈 이벤트 ~ ",
      start: 10,
      end: 12,
      type: "event",
      text: "동아리 스터디 디스코드 채널이 생겼습니다! 같이 공부하고 이벤트 상품 받아가세요!",
    },
    {
      content: "열공 스터디 이벤트 ~ ",
      start: 23,
      end: 24,
      type: "event",
      text: "동아리 스터디 디스코드 채널이 생겼습니다! 같이 공부하고 이벤트 상품 받아가세요!",
    },
    {
      content: "유령인원 정리 기간",
      start: 16,
      end: 17,
      type: "main",
      text: "",
    },
    {
      content: "동아리 전체 정기모임",
      start: 27,
      end: 28,
      type: "main",
      text: "",
    },
    {
      content: "지역 정기모임 주간",
      start: 13,
      end: 15,
      type: "schedule",
      text: "",
    },
    {
      content: "시험대비 스터디 집중 기간 ~ ",
      start: 29,
      end: 30,
      type: "schedule",
      text: "",
    },
    {
      content: "ABOUT 빙고판 이벤트",
      start: 17,
      end: 18,
      type: "event",
      text: "",
    },
    {
      content: "소모임 홍보/집중 기간 ~",
      start: 9,
      end: 10,
      type: "schedule",
      text: "",
    },
  ],
  10: [
    {
      content: "서비스 리뉴얼 ~ ",
      start: 1,
      end: 18,
      type: "main",
      text: "1차 리뉴얼 준비 기간",
    },
    {
      content: "시험 기간 이벤트 ~ ",
      start: 18,
      end: 25,
      type: "event",
      text: "매일 매일!! 어떤 스터디든 상관없이 스터디 인증만 하면 랜덤으로 기프티콘을 보내드립니다!!",
    },
    {
      content: "스터디 참여 이벤트 ~ ",
      start: 18,
      end: 31,
      type: "schedule",
      text: "정규 스터디, 매칭된 스터디, 심지어 개인 스터디까지! 공부하고 인증만 하면 치킨을 드립니다!! ",
    },
    {
      content: "동아리 규칙 및 운영방침 리뉴얼 ~ ",
      start: 21,
      end: 25,
      type: "main",
      text: "더 활성화 된 동아리가 될 수 있도록! 운영 방식을 리뉴얼 합니다.",
    },
  ],
  11: [
    {
      content: "영화관 대관 + 닭발",
      start: 3,
      end: 3,
      type: "schedule",
    },
    {
      content: "행궁동 카페 탐방",
      start: 2,
      end: 2,
      type: "schedule",
    },
    {
      content: "AI 콘텐츠 페스티벌",
      start: 2,
      end: 2,
      type: "schedule",
    },
    {
      content: "카공 + 삼겹살 + 맥주",
      start: 3,
      end: 3,
      type: "schedule",
    },
    {
      content: "전체 지역",
      start: 8,
      end: 8,
      type: "main",
      textPosition: "end",
    },
    {
      content: "정기 모임",
      start: 9,
      end: 9,
      type: "main",
      textPosition: "start",
    },
    {
      content: "연어/참치 무한리필",
      start: 17,
      end: 17,
      type: "schedule",
    },
    {
      content: "건대 볼링",
      start: 21,
      end: 21,
      type: "schedule",
    },
    {
      content: "디저트 카페 + 맛집 탐방",
      start: 24,
      end: 24,
      type: "schedule",
    },
    {
      content: "오늘 저녁은 치킨이닭",
      start: 13,
      end: 13,
      type: "schedule",
    },
    {
      content: "광교 카페거리 탐방",
      start: 23,
      end: 23,
      type: "schedule",
    },
    {
      content: "전시회 & 크리스마스",
      start: 21,
      end: 21,
      type: "schedule",
    },
    {
      content: "방 탈출 번개",
      start: 30,
      end: 30,
      type: "schedule",
    },
    {
      content: "을지로 골목 사진 출사",
      start: 26,
      end: 26,
      type: "schedule",
    },
    {
      content: "보드게임 + 공연 관람",
      start: 24,
      end: 24,
      type: "schedule",
    },
    {
      content: "홍보 서포터즈 모집",
      start: 23,
      end: 23,
      type: "main",
    },
    {
      content: "시험 스터디",
      start: 25,
      end: 25,
      type: "main",
      textPosition: "end",
    },
    {
      content: "챌린지 시작",
      start: 26,
      end: 26,
      type: "main",
      textPosition: "start",
    },
    {
      content: "new 소모임",
      start: 21,
      end: 21,
      type: "main",
    },
    {
      content: "new 스토어",
      start: 18,
      end: 18,
      type: "main",
    },
    {
      content: "소모임 조사",
      start: 11,
      end: 11,
      type: "main",
    },
    {
      content: "빼빼로데이 선물 이벤트",
      start: 11,
      end: 11,
      type: "event",
    },
    {
      content: "수제 빼빼로",
      start: 8,
      end: 8,
      type: "event",
      textPosition: "end",
    },
    {
      content: "증정 이벤트",
      start: 9,
      end: 9,
      type: "event",
      textPosition: "start",
    },
    {
      content: "운영진/서포터즈 모집",
      start: 1,
      end: 1,
      type: "main",
    },
    {
      content: "도전 열품타,",
      start: 27,
      end: 27,
      type: "event",
      textPosition: "end",
    },
    {
      content: "시작 기간 ~ ",
      start: 28,
      end: 28,
      type: "event",
      textPosition: "start",
    },
    {
      content: "정기 모임",
      start: 4,
      end: 4,
      type: "main",
      textPosition: "end",
    },
    {
      content: "취합 기간",
      start: 5,
      end: 5,
      type: "main",
      textPosition: "start",
    },
  ],
  12: [
    {
      content: "톡방 재구성",
      start: 1,
      end: 1,
      type: "main",
    },
    {
      content: "열품타 스터디",
      start: 2,
      end: 2,
      type: "event",
      textPosition: "end",
    },
    {
      content: "챌린지 2차 !!",
      start: 3,
      end: 3,
      type: "event",
      textPosition: "start",
    },
    {
      content: "정기 스터디",
      start: 7,
      end: 7,
      type: "main",
    },
    {
      content: "정기 스터디",
      start: 7,
      end: 7,
      type: "main",
    },

    {
      content: "정기 스터디",
      start: 8,
      end: 8,
      type: "main",
    },
    {
      content: "정기 스터디",
      start: 8,
      end: 8,
      type: "main",
    },
    {
      content: "스케줄 스터디",
      start: 7,
      end: 7,
      type: "event",
    },
    {
      content: "스케줄 스터디",
      start: 8,
      end: 8,
      type: "event",
    },
    {
      content: "열품타 스터디",
      start: 9,
      end: 9,
      type: "event",
      textPosition: "end",
    },
    {
      content: "챌린지 3차 !!",
      start: 10,
      end: 10,
      type: "event",
      textPosition: "start",
    },
    {
      content: "정기 스터디",
      start: 14,
      end: 14,
      type: "main",
    },
    {
      content: "정기 스터디",
      start: 14,
      end: 14,
      type: "main",
    },

    {
      content: "정기 스터디",
      start: 15,
      end: 15,
      type: "main",
    },
    {
      content: "정기 스터디",
      start: 15,
      end: 15,
      type: "main",
    },
    {
      content: "스케줄 스터디",
      start: 14,
      end: 14,
      type: "event",
    },
    {
      content: "스케줄 스터디",
      start: 15,
      end: 15,
      type: "event",
    },
    {
      content: "동대문 카공",
      start: 3,
      end: 3,
      type: "schedule",
    },
    {
      content: "신규 소모임",
      start: 16,
      end: 16,
      type: "main",
      textPosition: "end",
    },
    {
      content: "20여개 개설",
      start: 17,
      end: 17,
      type: "main",
      textPosition: "start",
    },
    {
      content: "방학 공모전 및",
      start: 16,
      end: 16,
      type: "schedule",
      textPosition: "end",
    },
    {
      content: "프로젝트 취합",
      start: 17,
      end: 17,
      type: "schedule",
      textPosition: "start",
    },
    {
      content: "방학 중 팀플,",
      start: 23,
      end: 23,
      type: "schedule",
      textPosition: "end",
    },
    {
      content: "팀 매칭 기간",
      start: 24,
      end: 24,
      type: "schedule",
      textPosition: "start",
    },
    {
      content: "소모임 본격",
      start: 27,
      end: 27,
      type: "schedule",
      textPosition: "end",
    },
    {
      content: "활동 시작",
      start: 28,
      end: 28,
      type: "schedule",
      textPosition: "start",
    },
    {
      content: "동아리 겨울",
      start: 23,
      end: 23,
      type: "schedule",
      textPosition: "end",
    },
    {
      content: "MT 신청 기간",
      start: 24,
      end: 24,
      type: "schedule",
      textPosition: "start",
    },
    {
      content: "동네 세분화",
      start: 30,
      end: 30,
      type: "main",
      textPosition: "end",
    },
    {
      content: "순차적 실행",
      start: 31,
      end: 31,
      type: "main",
      textPosition: "start",
    },
    {
      content: "새해 목표",
      start: 30,
      end: 30,
      type: "event",
      textPosition: "end",
    },
    {
      content: "기록 이벤트",
      start: 31,
      end: 31,
      type: "event",
      textPosition: "start",
    },
  ],
};

export const EVENT_ALWAYS = [
  {
    title: "[항시] 에타 홍보 이벤트",
    content:
      "이벤트 탭의 홍보게시판에 들어가서 동아리를 학교 에타에 홍보해주세요! 매번 100 POINT + 추첨을 통해 치킨 기프티콘도 드려요!",
  },
];
