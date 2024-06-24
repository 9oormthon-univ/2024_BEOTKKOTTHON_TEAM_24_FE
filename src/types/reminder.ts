import { Insight } from './insight';

// GET /reminder/question
export type QuestionGetResponse = {
  todayClear: boolean;
  reminderQuestionList: {
    reminderQuestion: string;
    insightId: number;
    reminderId: number;
    reminderQuestionId: number;
    insightTitle: string;
    insightMainImage: string;
    insightTagList: string[];
  }[];
};

// POST /reminder/answer
export type AnswerPostRequest = {
  reminderQuestionId: number;
  reminderQuestion: string;
  reminderAnswer: string;
};

export type AnswerPostResponse = {
  insightId: number;
};

// POST /reminder/calendar
export type CalendarPostRequest = {
  requestDate: string;
};

type InsightWithIsRead = Insight & { isRead: boolean };

export type CalendarPostResponse = {
  date: string;
  remindRead: number;
  remindTotal: number;
  remindInsightList: InsightWithIsRead[];
};
