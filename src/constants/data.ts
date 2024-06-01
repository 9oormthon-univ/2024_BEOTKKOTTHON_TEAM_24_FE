import { CalendarPostResponse } from '@/types/reminder';

export const calendarData: CalendarPostResponse = {
  date: '2024-03-18',
  remindRead: 1,
  remindTotal: 2,
  remindInsightList: [
    {
      insightId: 2,
      insightMainImage: '/image/디자인1.jpg',
      insightTitle: '알아두면 쓸모있는 시멘틱 마크업 개념',
      insightSummary:
        '미드저니는 UX/UI디자인, 그래픽 디자인 등 다양한 분야에서 활용될 수있습니다. 미드저니를 활용해 UX/UI 디자인을 수행하는 경우, 시나리오와 퍼소나를 아주 높은 퀄리티로 시각화 할 수 있습니다.',
      insightTagList: ['UI/UX', '사용자 경험'],
      todayRead: false,
    },
    {
      insightId: 2,
      insightMainImage: '/image/개발1.jpg',
      insightTitle: '디자인시스템에 모션 가이드 추가하는 방법',
      insightSummary:
        '미드저니는 UX/UI디자인, 그래픽 디자인 등 다양한 분야에서 활용될 수있습니다. 미드저니를 활용해 UX/UI 디자인을 수행하는 경우, 시나리오와 퍼소나를 아주 높은 퀄리티로 시각화 할 수 있습니다.',
      insightTagList: ['UI/UX', '사용자 경험'],
      todayRead: true,
    },
  ],
};

export const insightData1 = {
  insightId: 2,
  insightMainImage: '/image/디자인1.jpg',
  insightTitle: '알아두면 쓸모있는 시멘틱 마크업 개념',
  insightSummary:
    '미드저니는 UX/UI디자인, 그래픽 디자인 등 다양한 분야에서 활용될 수있습니다. 미드저니를 활용해 UX/UI 디자인을 수행하는 경우, 시나리오와 퍼소나를 아주 높은 퀄리티로 시각화 할 수 있습니다.',
  insightTagList: ['UI/UX', '사용자 경험'],
  todayRead: false,
};

export const insightData2 = {
  insightId: 2,
  insightMainImage: '/image/개발1.jpg',
  insightTitle: '디자인시스템에 모션 가이드 추가하는 방법',
  insightSummary:
    '미드저니는 UX/UI디자인, 그래픽 디자인 등 다양한 분야에서 활용될 수있습니다. 미드저니를 활용해 UX/UI 디자인을 수행하는 경우, 시나리오와 퍼소나를 아주 높은 퀄리티로 시각화 할 수 있습니다.',
  insightTagList: ['UI/UX', '사용자 경험'],
  todayRead: true,
};

export const imageList = [
  '/image/개발1.jpg',
  '/image/개발2.jpg',
  '/image/개발3.jpg',
  '/image/디자인1.jpg',
  '/image/디자인2.jpg',
  '/image/디자인3.jpg',
  '/image/기획1.jpg',
  '/image/기획2.jpg',
  '/image/기획3.jpg',
];
