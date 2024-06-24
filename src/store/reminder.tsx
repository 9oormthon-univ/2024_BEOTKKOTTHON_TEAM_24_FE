import { create } from 'zustand';
import { CalendarPostResponse } from '../types/reminder';

interface CalendarPostResponseStore {
  recommendGetResponse: CalendarPostResponse;
  setRecommendGetResponse: (response: CalendarPostResponse) => void;
}

export const useCalendarPostResponseStore = create<CalendarPostResponseStore>((set) => ({
  recommendGetResponse: {
    date: "",
    remindRead: 0,
    remindTotal: 0,
    remindInsightList: [
      {
        insightId: 0,
        insightTitle: "",
        insightMainImage: "",
        insightSummary: "",
        insightTagList: [],
        todayRead: false,
      }
    ],
  },
  setRecommendGetResponse: (newResponse: CalendarPostResponse) =>
    set({ recommendGetResponse: newResponse }),
}));