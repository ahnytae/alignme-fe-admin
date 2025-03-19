import { useState } from 'react';
import { BackButton } from './components/backButton';
import { ContentCreateForm } from './components/contentCreateForm';
import ContentGuidelinesPopup from '@/components/dialog/ContentGuidelinesPopup';

interface ContentCreatePageProps {
  isEditMode?: boolean;
}

const DashboardCreatePage = ({ isEditMode }: ContentCreatePageProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative mx-5 max-w-[380px] pt-[100px] sm:mx-auto">
        <BackButton className="left-0 top-14" />
        <div className="text-heading-large text-content-primary">새 콘텐츠 등록</div>
        <div className="mb-9 mt-2 text-paragraph-base text-content-secondary">
          서비스 이용을 위해 정보를 입력해주세요.
        </div>
        <ContentCreateForm isEditMode={isEditMode} />
      </div>
      {!isOpen && <ContentGuidelinesPopup openModal={openModal} closeModal={closeModal} />}
    </>
  );
};
export default DashboardCreatePage;
