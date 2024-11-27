import { excludePath } from '@/constant/protectedUrl';
import { PATH } from '@/constant/urls';
import useAuthStore from '@/stores/useAuthStore';
import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useCheckLoginRedirect() {
  const location = useLocation();
  const { isLogin } = useAuthStore((state) => ({ isLogin: state.isLogin }));

  useLayoutEffect(() => {
    if (isLogin && excludePath.includes(location.pathname)) {
      window.location.replace(PATH.content_list);
    }
  }, []);
}
