export const getToken = () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  return { token, userId };
};

export const setToken = (token, userId) => {
  localStorage.setItem('token', token);
  localStorage.setItem('userId', userId);
};

export const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
};

export const isAuthenticated = () => {
  const { token } = getToken();
  return token !== null && token !== undefined;
};
