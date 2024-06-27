export type RemindType = 'DEFAULT' | 'WEEK' | 'MONTH';

export type Insight = {
  insightId: number;
  insightTitle: string;
  insightMainImage: string;
  insightSummary: string;
  insightTagList: string[];
  todayRead?: boolean;
  isRead?: boolean;
};

export type InsightDetail = {
  insightId: number;
  insightTitle: string;
  insightUrl: string;
  insightSummary: string;
  insightMainImage: string;
  insightMemo: string;
  insightSource: string;
  viewCount: number;
  insightTagList: string[];
  insightImageList: string[];
  remindType: RemindType;
  remindDays: number[];
  folderName: string;
  folderId: number;
  reminderQuestionList: {
    createdAt: string;
    updatedAt: string;
    reminderQuestionId: number;
    reminderQuestion: string;
    reminderAnswer: string | null;
    questionId: number;
    answeredAt: string | null;
  }[];
};

// GET /insight/share/{folderId}
export type FolderShareGetResponse = Insight[];

// GET /insight/{folderId}
export type FolderInsightGetRequest = {
  folderId: number;
};

export type FolderInsightGetResponse = Insight[];

// GET /insight/search/{folderId}
export type FolderSearchGetResponse = Insight[];

// GET /insight/{folderId}/{page}
export type FolderPageInsightGetResponse = Insight[];

// GET /insight/search/{folderId}/{search}
export type FolderSearchTagGetResponse = Insight[];

// POST /insight
export type InsightPostRequest = {
  insightUrl: string;
  insightTitle: string;
  insightSummary: string;
  insightMainImage: string;
  insightMemo: string;
  insightSource: string;
  viewCount: number;
  insightTagList: string[];
  insightImageList: string[];
  enable: boolean;
  remindType: RemindType;
  remindDays: number[];
  folderName: string;
};

export type InsightPostResponse = number;

// GET /insight
export type InsightGetRequest = {
  insightId: number;
};

export type InsightGetResponse = InsightDetail;

// GET /insight/recommend
export type RecommendGetResponse = Insight[];

// PUT /insight
export type InsightPutRequest = {
  insightId: number;
  insightSummary?: string;
  folderId?: number;
  insightUrl?: string;
  insightMainImage?: string;
  insightTagList?: string[];
  insightImageList?: string[];
  insightMemo?: string;
  insightSource?: string;
  reminderEanble?: boolean;
  reminderType?: string;
  reminderDayList?: number[];
  reminderAnswer?: string;
};

// GET /insight/ogimage
export type InsightOGImageGetRequest = string;

export type InsightOGImageGetResponse = string;
