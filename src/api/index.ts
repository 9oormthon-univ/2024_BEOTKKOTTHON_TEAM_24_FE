import axios from 'axios';

function createInstance() {
  const instance = axios.create({
    baseURL: process.env.API_BASE_URL,
  });
  return instance;
}

export const api = createInstance();
