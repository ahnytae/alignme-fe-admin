import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import SelectButton from './components/SelectButton';
import { seg, PATH } from '@/constant/urls';

const SignupTypePage = () => {
  /** hooks */
  const navigate = useNavigate();

  /** states */
  const [selectedType, setSelectedType] = useState<string | null>(null);

  /** handlers */
  const handleNavigate = () => {
    selectedType && navigate(seg(PATH.signup_type_info, [selectedType]));
  };

  const handleSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedType(e.currentTarget.value);
  };

  return (
    <main className="flex size-full items-center justify-center">
      {/** 타이틀 */}
      <div className="flex flex-col gap-14">
        <div className="flex flex-col gap-4">
          <h2 className="text-heading-large">가입 유형을 선택해주세요.</h2>
          <p className="text-paragraph-base text-content-secondary">어떤 역할로 가입할까요?</p>
        </div>

        {/** 가입 유형 */}
        <div className="flex flex-col gap-9">
          <div className="flex flex-col gap-2">
            <p className="text-label-base text-content-secondary">강사로 수업을 제공할게요.</p>
            <SelectButton value="instructor" isSelected={selectedType === 'instructor'} onClick={handleSelect}>
              강사로 가입하기
            </SelectButton>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-label-base text-content-secondary">레슨장을 운영중이에요.</p>
            <SelectButton value="studio" isSelected={selectedType === 'studio'} onClick={handleSelect}>
              대표강사로 가입하기
            </SelectButton>
          </div>
        </div>
        <Button variant="primary" size="area" disabled={selectedType === null} onClick={handleNavigate}>
          확인
        </Button>
      </div>
    </main>
  );
};

export default SignupTypePage;
