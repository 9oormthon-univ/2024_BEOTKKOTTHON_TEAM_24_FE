import { create } from 'zustand';
import { SignupPostRequest } from '../types/user';

interface SignupPostRequestStore {
  signupInput: SignupPostRequest;
  setSignupInput: (input: SignupPostRequest) => void;
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
