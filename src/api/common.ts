import axios from 'axios';
import { getCookie, removeCookie, setCookie } from '@/common/cookie';

export interface ServerErrorCode {
  errorCode: ErrorCode;
}

type ErrorCode = 'EXPIRED_TOKEN' | '...';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getCookie('accessToken');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (error.response.data.errorCode === 'EXPIRED_TOKEN') {
        const refreshToken = getCookie('refreshToken');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + getCookie('accessToken');
        const response = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/auth/refresh`, { refreshToken });
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

        setCookie('accessToken', newAccessToken);
        setCookie('refreshToken', newRefreshToken);

        originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
