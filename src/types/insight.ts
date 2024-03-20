export type Insight = {
  insightId: number;
  insightTitle: string;
  insightMainImg: string;
  insightSummary: string;
  insighthashTagList: string[];
};

export type InsightDetail = {
  insightUrl: string;
  insightMemo: string;
  insightSource: string;
  insightTitle: string;
  insightSummary: string;
  insightFolderName: string;
  insightReminder: {
    reminderType: string;
    reminderDay: number[];
  };
  insightHashTagList: string[];
  insightMainImage: string;
  insightImageList: string[];
};

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
export type InsightPostRequest = InsightDetail;

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
  folderId: number;
  insightUrl: string;
  insightMainImage: string;
  insightTagList: string[];
  insightImageList: string[];
  insightMemo: string;
  insightSource: string;
  reminderEanble: boolean;
  reminderType: string;
  reminderDayList: number[];
  reminderAnswer: string;
};
