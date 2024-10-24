import { BackButton } from './components/backButton';
import { ContentCreateForm } from './components/contentCreateForm';

interface ContentCreatePageProps {
  isEditMode?: boolean;
}

const DashboardCreatePage = ({ isEditMode }: ContentCreatePageProps) => {
  return (
    <div className="relative mx-5 max-w-[380px] pt-[100px] sm:mx-auto">
      <BackButton className="left-0 top-14" />
      <div className="text-heading-large text-content-primary">새 콘텐츠 등록</div>
      <div className="mb-9 mt-2 text-paragraph-base text-content-secondary">
        서비스 이용을 위해 정보를 입력해주세요.
      </div>
      <ContentCreateForm isEditMode={isEditMode} />
    </div>
  );
};
export default DashboardCreatePage;
