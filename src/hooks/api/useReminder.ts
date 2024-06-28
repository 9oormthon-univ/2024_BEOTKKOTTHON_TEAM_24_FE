import {
  getReminderQuestion,
  postReminderAnswer,
  postReminderCalendar,
} from '@/api/reminder';
import { AnswerPostRequest } from '@/types/reminder';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
  return useMutation({
    mutationFn: (date: string) =>
      postReminderCalendar({ requestDate: dayjs(date).format('YYYY-MM-DD') }),
    onError: (error) => {
      console.error(error);
    },
  });
}
