import api from '../common';
import { SignUpReq } from '@/types/signup';
import { AuthModel, AutoLoginResponse, SignUpInstructorResponse, SignUpManagerResponse } from '@/model/authModel';
import { getCookie } from '@/common/cookie';

/** 로그인 API */
export const login = async (code: string) => {
  return await api.get<AuthModel>(`/auth/user/login?code=${code}`);
};

/** 강사 회원가입 API */
export const signUpInstructor = async (params: Omit<SignUpReq, 'studioRegionName'>) => {
  return await api.post<SignUpInstructorResponse>('/users/signup-instructor', params);
};

/** 관리자 회원가입 API */
export const signUpManager = async (params: SignUpReq) => {
  return await api.post<SignUpManagerResponse>('/users/signup-manager', params);
};

/** 로그인 시 토큰 유효검증 + 자동로그인 처리 */
export const autoLogin = async () => {
  return await api.post<AutoLoginResponse>('/auth/auto-login', {
    refreshToken: getCookie('refreshToken'),
  });
};
