import { MyPageForm } from './components/myPageForm';
const MyPage = () => {
  return (
    // <div className="flex size-full items-center justify-center">
    <div className="mx-4 max-w-[380px] pb-[120px] pt-[136px] sm:mx-auto">
      <div className="flex flex-col gap-9">
        <div className="text-heading-large text-content-primary">마이페이지</div>
        <MyPageForm />
      </div>
    </div>
    // </div>
  );
};

export default MyPage;
