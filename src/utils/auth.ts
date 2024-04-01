export const setAccessToken = (token: string | null) => {
  localStorage.setItem('authorization', token || '');
};

export const getAccessToken = () => {
  return localStorage.getItem('authorization');
};

export const deleteAccessToken = () => {
  localStorage.removeItem('authorization');
};
