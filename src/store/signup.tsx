import { create } from 'zustand';
import { SignupPostRequest, SignupPostResponse } from '../types/user';

interface SignupPostRequestStore {
  signupInput: SignupPostRequest;
  setSignupInput: (input: SignupPostRequest) => void;
}

interface userTokenStore {
  userToken: SignupPostResponse,
  setUserToken: (input: SignupPostResponse) => void;
}

export const useSignupInputStore = create<SignupPostRequestStore>((set) => ({
  signupInput: {
    userEmail: '',
    userPassword: '',
    userName: '',
    job: 'ETC',
    topicList: [],
  },
  setSignupInput: (newInput: SignupPostRequest) =>
    set({ signupInput: newInput }),
}));

export const useUserTokenStore = create<userTokenStore>((set) => ({
  userToken: {
    accessToken: "",
    refreshToken: ""
  },
  setUserToken: (newInput: SignupPostResponse) =>
    set({ userToken: newInput }),
}));