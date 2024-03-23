import axios from 'axios';

function createInstance() {
  const instance = axios.create({
    baseURL: process.env.API_BASE_URL,
  });
  return instance;
  // TODO: 로그인 구현 후 Interceptor 활성화
  // return setInterceptors(instance)
}

function createInstanceWithoutAuth() {
  const instance = axios.create({
    baseURL: process.env.API_BASE_URL,
  });
  return instance;
}

export const api = createInstance();
export const apiWithoutAuth = createInstanceWithoutAuth();
