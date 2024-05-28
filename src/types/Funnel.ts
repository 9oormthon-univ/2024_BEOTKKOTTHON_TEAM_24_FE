import { SignupPostRequest } from './user';

export interface SignupFunnel {
  signupInfo: SignupPostRequest;
  setSignupInfo: (value: SignupPostRequest) => void;
  toNextStep: () => void;
}
