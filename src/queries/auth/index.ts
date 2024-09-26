import { login } from '@/api/auth';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constant/queryKey';

/** 로그인 */
export const useLogin = () => {
  return useQuery({ queryKey: [QUERY_KEY.USER], queryFn: () => {} });
};

/** 회원가입 */
export const useSignUp = () => {
  return useQuery({ queryKey: ['aa'], queryFn: () => {} });
};
