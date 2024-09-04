import { useNavigate } from 'react-router-dom';
import KaKaoButton from './components/KaKaoButton';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleOauth = () => {
    navigate(`/signup-type`);
  };

  return (
    <main className="flex size-full items-center justify-center">
      <div className="flex flex-col items-center gap-14">
        {/** 타이틀 */}
        <div className="flex flex-col gap-4">
          <h2 className="text-center text-heading-large">시작하기</h2>
          <p className="whitespace-pre-line text-center text-paragraph-base text-content-secondary">
            {'개인화된 AI 피드백 시스템으로 \n수업 효과를 극대화하세요.'}
          </p>
        </div>

        <div>
          {/** 카카오 로그인 */}
          <KaKaoButton onClick={handleOauth}>카카오톡으로 시작하기</KaKaoButton>

          {/** 개인정보 보호정책 */}
          <p className="mt-6 whitespace-pre-line text-center text-sm text-content-tertiary">
            {'로그인은 '}
            <a href="/" className="underline">
              개인 정보 보호 정책
            </a>
            {' 및 '}
            <a href="/" className="underline">
              서비스 약관
            </a>
            {'에 \n동의하는 것을 의미합니다.'}
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
