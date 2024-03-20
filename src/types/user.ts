export type Job = 'PLANNER' | 'DESIGNER' | 'DEVELOPER' | 'ETC';

export type SignupPostRequest = {
  userEmail: string;
  userPassword: string;
  userName: string;
  job: Job;
  topicList: string[];
};

export type LoginPostRequest = {
  userEmail: string;
  password: string;
};

export type LoginPostResponse = {
  accessToken: string;
  refreshToken: string;
};

export type RefreshPostRequest = {
  refreshToken: string;
};

export type RefreshPostResponse = {
  accessToken: string;
  refreshToken: string;
};
