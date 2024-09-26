import { useLayoutEffect } from 'react';
import Router from './router';
import { getCookie, setCookie } from './common/cookie';
import useAuthStore from './stores/useAuthStore';
import api from './api/common';

type TokenRefresh = { accessToken: string; refreshToken: string };

function App() {
  useLayoutEffect(() => {
    const { isLogin, setIsLogin, setIsLoading } = useAuthStore.getState();

    const refreshToken = getCookie('refreshToken');
    if (isLogin || !refreshToken) return;

    const refreshTokens = async () => {
      const { data } = await api.post<TokenRefresh>('/auth/refresh', { refreshToken });
      return data;
    };

    try {
      setIsLoading(true);
      (async () => {
        const { accessToken, refreshToken } = await refreshTokens();
        setCookie('accessToken', accessToken);
        setCookie('refreshToken', refreshToken);
        setIsLogin(true);
        setIsLoading(false);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

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
