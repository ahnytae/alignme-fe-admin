import api from '../common';
import { AuthModel } from '@/model/authModel';

/** 로그인 API */
export const login = async (code: string) => {
  return await api.get<AuthModel>(`/auth/user/login/kakao/access?code=${code}`);
};

/** 회원가입 API */
export const signUp = async () => {
  return await api.post('');
};
