import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/common';
import { setCookie } from '@/common/cookie';
import { AuthModel } from '@/model/authModel';
import { PATH } from '@/constant/urls';
import useUserStore from '@/stores/useUserStore';
import useAuthStore from '@/stores/useAuthStore';
import useCheckLoginRedirect from '@/hooks/useCheckLoginRedirect';
import { getUserInfo } from '@/api/users';

export default function SuccessAuthRedirectPage() {
  const navigate = useNavigate();
  const { setKakaoMemberId, setEmail, setUserName, setIsMainInstructor } = useUserStore();
  // useCheckLoginRedirect();

  const { setIsLogin } = useAuthStore((state) => ({
    setIsLogin: state.setIsLogin,
  }));

  useEffect(() => {
    (async () => {
      try {
        const code = new URL(window.location.href).searchParams.get('code');

        const {
          data: {
            data: { accessToken, refreshToken, isAlready },
          },
        } = await api.get<AuthModel>(`/auth/user/login?code=${code}`);

        setCookie('accessToken', accessToken);
        // setCookie('refreshToken', refreshToken);
        setIsLogin(true);

        const {
          data: { id, kakaoMemberId, email, name, role, isMainInstructor },
        } = await getUserInfo();

        setEmail(email);
        setUserName(name);
        setKakaoMemberId(`${kakaoMemberId}`);
        setIsMainInstructor(isMainInstructor);

        console.log('@@@', isAlready, isMainInstructor);

        if (isAlready) {
          setIsLogin(true);
          navigate(PATH.content_list);
        } else {
          navigate('/signup-type');
        }
      } catch (error) {
        // if (error instanceof AxiosError) {
        //   if (error.response?.status === 403) {
        //     console.log('e', error);
        //     // 권한 에러 처리
        //     navigate('/test');
        //   }
        // }
      }
    })();
  }, [navigate, setIsLogin]);

  // Todo: 로딩 스피너 추가
  return <div />;
}
