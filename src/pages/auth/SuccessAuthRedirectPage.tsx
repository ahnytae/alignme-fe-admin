import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/common';
import { setCookie } from '@/common/cookie';
import { AuthModel } from '@/model/authModel';
import useAuthStore from '@/stores/useAuthStore';
import { PATH } from '@/constant/urls';

export default function SuccessAuthRedirectPage() {
  const navigate = useNavigate();

  const { setIsLogin, setIsLoading } = useAuthStore((state) => ({
    setIsLogin: state.setIsLogin,
    setIsLoading: state.setIsLoading,
  }));

  useEffect(() => {
    (async () => {
      try {
        const code = new URL(window.location.href).searchParams.get('code');

        const {
          data: {
            data: { accessToken, refreshToken, isAleradyUser },
          },
        } = await api.get<AuthModel>(`/auth/user/login/kakao/access?code=${code}`);

        setCookie('accessToken', accessToken);
        setCookie('refreshToken', refreshToken);
        setIsLogin(true);
        setIsLoading(false);

        if (isAleradyUser) {
          setIsLogin(true);
          setIsLoading(false);
          navigate(PATH.content_list);
        } else {
          navigate('/signup-type');
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [navigate, setIsLogin]);

  // Todo: 로딩 스피너 추가
  return <div />;
}
