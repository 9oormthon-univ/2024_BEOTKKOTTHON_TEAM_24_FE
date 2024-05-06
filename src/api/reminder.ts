import { api } from '@/api';
import {
  AnswerPostRequest,
  AnswerPostResponse,
  CalendarPostRequest,
  CalendarPostResponse,
  QuestionGetResponse,
} from '@/types/reminder';

// 리마인드 질문
export async function getReminderQuestion(): Promise<QuestionGetResponse> {
  const response = await api.get(`/reminder/question`);
  return response.data;
}

// 리마인드 답변 작성하기
export async function postReminderAnswer(
  answerData: AnswerPostRequest,
): Promise<AnswerPostResponse> {
  const response = await api.post(`/reminder/answer`, answerData);
  return response.data;
}

// 리마인드 캘린더
export async function postReminderCalendar(
  calendarData: CalendarPostRequest,
): Promise<CalendarPostResponse> {
  const response = await api.post(`/reminder/calendar`, calendarData);
  return response.data;
}
