import {
  getReminderQuestion,
  postReminderAnswer,
  postReminderCalendar,
} from '@/api/reminder';
import { Insight } from '@/types/insight';
import { AnswerPostRequest, CalendarPostResponse } from '@/types/reminder';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCalendarPostResponseStore, useFetchStore } from '@/store/reminder';
import dayjs from 'dayjs';

export function useGetReminderQuestion() {
  return useQuery({
    queryKey: ['reminder-question'],
    queryFn: getReminderQuestion,
  });
}

export function usePostReminderAnswer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (answerData: AnswerPostRequest) =>
      postReminderAnswer(answerData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['reminder-question'] }),
  });
}

export function usePostReminderCalendar() {
  const { setRecommendPostResponse } = useCalendarPostResponseStore();
  const { setHasFetched } = useFetchStore();
  return useMutation({
    mutationFn: (date: string) =>
      postReminderCalendar({ requestDate: dayjs(date).format('YYYY-MM-DD') }),
    onSuccess: (data) => {
      const dataWithFlag: CalendarPostResponse = {
        ...data,
        remindInsightList: data.remindInsightList.map((insight: Insight) => ({
          ...insight,
          isRead: false,
        })),
      };
      setRecommendPostResponse(dataWithFlag);
      setHasFetched(true);
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
