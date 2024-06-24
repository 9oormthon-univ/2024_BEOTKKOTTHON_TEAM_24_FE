import { create } from 'zustand';
import { CalendarPostResponse } from '../types/reminder';

interface CalendarPostResponseStore {
  recommendPostResponse: CalendarPostResponse;
  setRecommendPostResponse: (response: CalendarPostResponse) => void;
}

type Store = {
  hasFetched: boolean;
  setHasFetched: (fetched: boolean) => void;
};

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

export const useFetchStore = create<Store>((set) => ({
  hasFetched: false,
  setHasFetched: (fetched) => set({ hasFetched: fetched }),
}));