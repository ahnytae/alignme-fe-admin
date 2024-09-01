import { KaKaoButton } from '../components';

const SignInPage = () => {
  const handleClick = () => {
    console.log('first');
  };

  return (
    <main className="flex size-full items-center justify-center">
      {/** 타이틀 */}
      <div className="flex flex-col gap-12">
        <h2 className="text-center text-heading-large">로그인</h2>
        <KaKaoButton onClick={handleClick}>카카오톡으로 시작하기</KaKaoButton>
      </div>
    </main>
  );
};

export default SignInPage;
