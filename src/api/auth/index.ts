import api from '../common';
import { SignUpReq } from '@/types/signup';
import { AuthModel } from '@/model/authModel';

/** 로그인 API */
export const login = async (code: string) => {
  return await api.get<AuthModel>(`/auth/user/login/kakao/access?code=${code}`);
};

/** 강사 회원가입 API */
export const signUpInstructor = async (params: Omit<SignUpReq, 'studioRegionName'>) => {
  return await api.post('/profile/signup-instructor', params);
};

/** 관리자 회원가입 API */
export const signUpManager = async (params: SignUpReq) => {
  return await api.post('/profile/signup-manager', params);
};
