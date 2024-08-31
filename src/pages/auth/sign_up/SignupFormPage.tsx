import { useParams } from 'react-router-dom';
import { InstructorForm, StudioForm } from '../components';

type PageParams = 'instructor' | 'studio';

const PAGE_TYPE = {
  instructor: '강사',
  studio: '레슨장',
};

const SignupFormPage = () => {
  const { type } = useParams<{ type: PageParams }>();

  if (!type || !(type in PAGE_TYPE)) {
    return <div>ㅜ.ㅜ</div>;
  }

  const Comp = type === 'instructor' ? InstructorForm : StudioForm;

  return (
    <main className="flex size-full items-center justify-center">
      <div className="flex flex-col gap-9">
        {/** 타이틀 */}
        <div className="flex flex-col gap-2">
          <h2 className="text-heading-large">{PAGE_TYPE[type]} 정보 입력</h2>
          <p className="whitespace-pre-line text-paragraph-base text-content-secondary">
            서비스 이용을 위해 정보를 입력해주세요.
          </p>
        </div>
        <Comp />
      </div>
    </main>
  );
};

export default SignupFormPage;
