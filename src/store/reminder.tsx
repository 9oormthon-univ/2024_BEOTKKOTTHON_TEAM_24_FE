import { create } from 'zustand';
import { CalendarPostResponse } from '../types/reminder';

interface CalendarPostResponseStore {
  recommendPostResponse: CalendarPostResponse;
  setRecommendPostResponse: (response: CalendarPostResponse) => void;
}

export const useCalendarPostResponseStore = create<CalendarPostResponseStore>(
  (set) => ({
    recommendPostResponse: {
      date: '',
      remindRead: 0,
      remindTotal: 0,
      remindInsightList: [
        {
          insightId: 0,
          insightTitle: '',
          insightMainImage: '',
          insightSummary: '',
          insightTagList: [],
          todayRead: false,
          isRead: false,
        },
      ],
    },
    setRecommendPostResponse: (newResponse: CalendarPostResponse) =>
      set({ recommendPostResponse: newResponse }),
  }),
);
