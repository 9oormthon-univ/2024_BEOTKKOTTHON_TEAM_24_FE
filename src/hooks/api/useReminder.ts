import {
  getReminderQuestion,
  postReminderAnswer,
  postReminderCalendar,
} from '@/api/reminder';
import { AnswerPostRequest, CalendarPostRequest } from '@/types/reminder';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
  return useMutation({
    mutationFn: (calendarData: CalendarPostRequest) =>
      postReminderCalendar(calendarData),
  });
}
