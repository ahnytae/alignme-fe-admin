import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/common';
import { setCookie } from '@/common/cookie';
import { AuthModel } from '@/model/authModel';
import useAuthStore from '@/stores/useAuthStore';
import { PATH } from '@/constant/urls';

export default function SuccessAuthRedirectPage() {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const code = new URL(window.location.href).searchParams.get('code');
        const setIsLogin = useAuthStore.getState().setIsLogin;

        const {
          data: {
            data: { accessToken, refreshToken, isAleradyUser },
          },
        } = await api.get<AuthModel>(`/auth/user/login/kakao/access?code=${code}`);

        setCookie('accessToken', accessToken);
        setCookie('refreshToken', refreshToken);

        if (isAleradyUser) {
          setIsLogin(true);
          navigate(PATH.content_list);
        } else {
          navigate('/signup-type');
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  // Todo: 로딩 스피너 추가
  return <div />;
}
