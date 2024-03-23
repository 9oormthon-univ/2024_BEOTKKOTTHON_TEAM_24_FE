import { api } from '@/api';
import {
  AnswerPostRequest,
  AnswerPostResponse,
  CalenderPostRequest,
  CalenderPostResponse,
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
export async function postReminderCalender(
  calenderData: CalenderPostRequest,
): Promise<CalenderPostResponse> {
  const response = await api.post(`/reminder/calender`, calenderData);
  return response.data;
}
