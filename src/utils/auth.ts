
import { cookies } from 'next/headers';

export const getAccessToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('accessToken');
};

export const getRefreshToken = () => {
  const cookieStore = cookies();
  return cookieStore.get('refreshToken');
};
