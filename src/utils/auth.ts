import { cookies } from 'next/headers';

export const getAccessToken = () => {
  const cookieStore = cookies();
  return cookieStore.get('AccessToken');
};

export const getRefreshToken = () => {
  const cookieStore = cookies();
  return cookieStore.get('RefreshToken');
};
