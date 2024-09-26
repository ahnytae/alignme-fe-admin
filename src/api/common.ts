import axios from 'axios';
import { getCookie, removeCookie, setCookie } from '@/common/cookie';
import useAuthStore from '@/stores/useAuthStore';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    accessToken: await getCookie('accessToken'),
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

    // 토큰이 만료 401
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/auth/refresh`, { refreshToken });
        const { accessToken } = response.data;

        setCookie('accessToken', accessToken);

        // 새로운 액세스 토큰으로 원래 요청 재시도
        originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;
        return api(originalRequest);
      } catch (refreshError) {
        const setIsLogin = useAuthStore.getState().setIsLogin;

        // 리프레시 토큰도 만료된 경우 로그아웃 처리
        removeCookie('accessToken');
        removeCookie('refreshToken');

        // 로그인 상태 변경
        setIsLogin(false);

        // 로그인 페이지로 리다이렉트
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
