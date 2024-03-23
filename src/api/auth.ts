import {
  SignupPostRequest,
  LoginPostResponse,
  LoginPostRequest,
  SignupPostResponse,
  RefreshPostRequest,
  RefreshPostResponse,
} from '@/types/user';
import { api } from '@/api';

export async function signup(
  signupData: SignupPostRequest,
): Promise<SignupPostResponse> {
  const response = await api.post('/user/signup', signupData);
  return response.data;
}

export async function login(
  loginData: LoginPostRequest,
): Promise<LoginPostResponse> {
  const response = await api.post('/user/login', loginData);
  return response.data;
}

export async function refresh(
  refreshData: RefreshPostRequest,
): Promise<RefreshPostResponse> {
  const response = await api.post('/user/refresh', refreshData);
  return response.data;
}

export async function logout() {
  await api.delete('/user/logout');
}

export async function deactivate() {
  await api.delete('/user/deactivate');
}
