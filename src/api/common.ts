import axios from 'axios';
import { getCookie, removeCookie, setCookie } from '@/common/cookie';
import { toast } from 'react-toastify';
import useAuthStore from '@/stores/useAuthStore';

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
  withCredentials: true,
  withXSRFToken: true,
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
  (response) => response,
  async (error) => {
    const setIsLogin = useAuthStore.getState().setIsLogin;
    const originalRequest = error.config;

    try {
      // 토큰 유효성 검사
      if (error.response?.status === 401 && error.response.data.code === 'ERR_01') {
        removeCookie('accessToken');
        removeCookie('refreshToken');
        toast.error('토큰이 유효하지 않습니다. 다시 로그인해주세요.');
        setIsLogin(false);

        setTimeout(() => {
          window.location.replace('/login');
        }, 1000);
        return Promise.reject(error);
      }

      // 가입 진행 중 상태 처리
      if (error.response?.status === 401 && error.response.data.code === 'SIGNING_PENDING') {
        toast.error('가입 중인 페이지로 이동합니다.');
        window.location.replace('/signup-type');
        return Promise.reject(error);
      }

      // 가입 대기 상태 처리
      if (error.response?.status === 403 && error.response.data.code === 'USER_PENDING') {
        toast.error('가입 대기 페이지로 이동합니다.');
        window.location.replace('/signup/pending');
        return Promise.reject(error);
      }

      // 토큰 만료시 재발급
      if (error.response?.status === 401 && error.response.data.code === 'ERR_02' && !originalRequest._retry) {
        originalRequest._retry = true;

        // 리프레시 토큰으로 새 토큰 발급 시도
        try {
          const accessToken = getCookie('accessToken');
          // const refreshToken = getCookie('refreshToken');
          // if (!refreshToken) {
          //   throw new Error('No refresh token');
          // }

          const response = await api.post(
            `${process.env.REACT_APP_BASE_API_URL}/auth/refresh`,
            // { refreshToken },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );

          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

          // 새 토큰 저장
          setCookie('accessToken', newAccessToken);
          // setCookie('refreshToken', newRefreshToken);

          // 원래 요청 재시도
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // 토큰 갱신 실패
          setIsLogin(false);
          removeCookie('accessToken');
          removeCookie('refreshToken');

          toast.error('다시 로그인해주세요.');

          // setTimeout(() => {
          //   window.location.replace('/login');
          // }, 2000);
          return Promise.reject(error);
        }
      }

      // 가입 대기 상태 처리
      if (error.response?.status === 403 && error.response.data.code === 'ERR_05') {
        window.location.replace('/signup/pending');
        return;
      }

      // 스튜디오 찾을 수 없음 처리
      if (error.response?.status === 404 && error.response.data.code === 'ERR_41') {
        toast.error('스튜디오 정보를 찾을 수 없습니다.');
        return Promise.reject(error);
      }

      // 유저 내보내기
      if (error.response?.status === 400 && error.response.data.code === 'ERR_14') {
        toast.error('대표 강사는 내보낼 수 없습니다.');
        return Promise.reject(error);
      }

      // 변경하려는 강사와 기존 강사 동일 (변경x)
      if (error.response?.status === 400 && error.response.data.code === 'ERR_15') {
        toast.error('변경하려는 강사와 기존 강사가 동일합니다.');
        return Promise.reject(error);
      }

      // 그 외 에러
      return Promise.reject(error);
    } catch (e) {
      // 예상치 못한 에러 처리
      console.error('Interceptor error:', e);
      return Promise.reject(error);
    }
  },
);
export default api;
