// GET /reminder/question
export type QuestionGetResponse = {
  todayClear: boolean;
  ReminderQuestionList: {
    reminderQuestion: string;
    insightId: number;
    reminderId: number;
    insightTitle: string;
    insightMainImage: string;
    insightTagList: string[];
  }[];
};

// POST /reminder/answer
export type AnswerPostRequest = {
  reminderId: number;
  reminderQuestion: string;
  reminderAnswer: string;
};

export type AnswerPostResponse = {
  insightId: number;
};

// POST /reminder/calender
export type CalenderPostRequest = {
  requestDate: string;
};

export type CalenderPostResponse = {
  date: string;
  remindRead: number;
  remindTotal: number;
  remindInsightList: RemindInsight[];
};

export type RemindInsight = {
  insightId: number;
  insightTitle: string;
  insightMainImage: string;
  insightTagList: string[];
  todayRead: boolean;
};
