import axios, { AxiosInstance } from 'axios';
import { getAccessToken } from '@/utils/auth';

function setInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use(
    (config) => {
      if (typeof window !== 'undefined' && config.headers) {
        config.headers.Authorization = `Bearer ${getAccessToken()}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return instance;
}

function createInstance() {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });
  return setInterceptors(instance);
}

function createInstanceWithoutAuth() {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });
  return instance;
}

export const api = createInstance();
export const apiWithoutAuth = createInstanceWithoutAuth();
