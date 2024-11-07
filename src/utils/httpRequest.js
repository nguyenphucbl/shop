import axios from 'axios';
import Cookies from 'js-cookie';
const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
httpRequest.interceptors.request.use(
  async config => {
    const token = Cookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
httpRequest.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get('refresh_token');
      if (!refreshToken) return Promise.reject(error);
      try {
        const res = await httpRequest.post('auth/refresh-token', {
          refreshToken,
        });
        const newAccessToken = res.data.access_token;
        Cookies.set('access_token', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return httpRequest(originalRequest);
      } catch (error) {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        return Promise.reject(error);
      }
    }
  },
);
export const get = async (path, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response;
};
export const post = async (path, data, options = {}) => {
  const response = await httpRequest.post(path, data, options);
  return response;
};
export default httpRequest;
