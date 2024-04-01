import {
  SignupPostRequest,
  LoginPostResponse,
  LoginPostRequest,
  SignupPostResponse,
  RefreshPostRequest,
  RefreshPostResponse,
} from '@/types/user';
import { api, apiWithoutAuth } from '@/api';
import { useQuery } from '@tanstack/react-query';

export async function signup(
  signupData: SignupPostRequest,
): Promise<SignupPostResponse> {
  const response = await apiWithoutAuth.post('/user/signup', signupData);
  return response.data;
}
export const useSignup = (signupData: SignupPostRequest) => {
  const { error, isSuccess } = useQuery({
    queryKey: ['login'],
    queryFn: () => signup(signupData),
    enabled: !!signupData,
  });
  return { error, isSuccess };
};

export async function login(
  loginData: LoginPostRequest,
): Promise<LoginPostResponse> {
  const response = await apiWithoutAuth.post('/user/login', loginData);
  return response.data;
}

export const useLogin = (loginData: LoginPostRequest) => {
  const { error, data, isSuccess } = useQuery({
    queryKey: ['login'],
    queryFn: () => login(loginData),
    enabled: !!loginData,
  });
  return { error, data, isSuccess };
};

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
