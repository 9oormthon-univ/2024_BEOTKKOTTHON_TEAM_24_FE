import { AxiosInstance } from 'axios';
import { CLIENT_RENDERED } from '@/constants/window';
import { getAccessToken } from '@/utils/auth';

function setInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use(
    (config) => {
      if (CLIENT_RENDERED && config.headers) {
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

export default setInterceptors;
