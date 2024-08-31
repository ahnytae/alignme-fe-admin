import { useParams } from 'react-router-dom';
import KaKaoButton from '../components/KaKaoButton';

type PageParams = 'instructor' | 'studio';

const PAGE_TYPE: Record<PageParams, { title: string; description: string }> = {
  instructor: { title: '강사로 가입하기', description: '개인화된 AI 피드백 시스템으로\n수업 효과를 극대화하세요.' },
  studio: {
    title: '레슨장으로 가입하기',
    description: '레슨장 강사님을 관리할 수 있어요.\n강사와 수강생을 연결해보세요.',
  },
};

const SignupPage = () => {
  const { type } = useParams<{ type: PageParams }>();

  if (!type) {
    return <div>ㅜ.ㅜ</div>;
  }

  return (
    <main className="flex size-full items-center justify-center">
      <div className="flex flex-col items-center gap-14">
        {/** 타이틀 */}
        <div className="flex flex-col gap-4">
          <h2 className="text-heading-large">{PAGE_TYPE[type].title}</h2>
          <p className="whitespace-pre-line text-center text-paragraph-base text-content-secondary">
            {PAGE_TYPE[type].description}
          </p>
        </div>

        <div>
          {/** 카카오 로그인 */}
          <KaKaoButton />

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

export default SignupPage;

// 로그인은 개인 정보 보호 정책 및 서비스 약관에 동의하는 것을 의미합니다.
