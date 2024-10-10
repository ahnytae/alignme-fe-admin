import { useLayoutEffect } from 'react';
import Router from './router';
import { getCookie, removeCookie, setCookie } from './common/cookie';
import useAuthStore from './stores/useAuthStore';
import axios from 'axios';

type TokenRefresh = { accessToken: string; refreshToken: string };

function App() {
  const { isLogin, setIsLogin, setIsLoading } = useAuthStore((state) => ({
    isLogin: state.isLogin,
    setIsLogin: state.setIsLogin,
    setIsLoading: state.setIsLoading,
  }));

  // useLayoutEffect(() => {
  //   const accessToken = getCookie('accessToken');
  //   const refreshToken = getCookie('refreshToken');

  //   // 사용자가 로그인 상태이거나 refreshToken이 없으면 자동 로그인 실행 안함
  //   if (isLogin || !refreshToken) return;

  //   // 토큰 갱신 함수
  //   const refreshTokens = async () => {
  //     const { data } = await axios.post<TokenRefresh>(
  //       '/auth/refresh',
  //       { refreshToken },
  //       {
  //         baseURL: process.env.REACT_APP_BASE_API_URL,
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           'Content-Type': 'application/x-www-form-urlencoded',
  //         },
  //       },
  //     );
  //     return data;
  //   };

  //   // 자동 로그인 함수
  //   const autoLogin = async () => {
  //     try {
  //       const { accessToken, refreshToken } = await refreshTokens();
  //       setCookie('accessToken', accessToken);
  //       setCookie('refreshToken', refreshToken);
  //       setIsLogin(true);
  //     } catch (error) {
  //       removeCookie('accessToken');
  //       removeCookie('refreshToken');
  //       console.log(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   autoLogin();
  // }, [isLogin, setIsLogin, setIsLoading]);

  return (
    <>
      <Router />

      {/* <div className="App">
        <div className="bg-background-primary text-content-primary">
          <h1 className="text-heading-large text-brand-primary">제목</h1>
          <p className="text-paragraph-base text-content-secondary">
            본문 내용
          </p>
          <button className="bg-feature-easy text-core-white">
            쉬운 난이도
          </button>
          <div className="border border-border-primary"></div>
        </div>
      </div> */}
    </>
  );
}

export default App;
