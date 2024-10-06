const AwaitingApproval = () => {
  return (
    <main className="flex size-full flex-col items-center justify-center">
      <div>
        <h2 className="text-right text-heading-large text-[#DBBD1F]">승인 대기 중</h2>
        <p className="mt-2 whitespace-pre-line text-center text-label-base text-content-secondary">
          {'강사님의 승인을 기다리고 있어요. \n승인 후 강사님의 모든 운동을 복습할 수 있어요.'}
        </p>
        {/** CARD */}
        <div className="mt-6 flex w-[350px] flex-col items-center rounded-2xl border border-border-primary p-14 shadow-md">
          <img src="" alt="프로필 이미지" className="size-[120px]" />
          <h3 className="text-heading-tiny">강사님</h3>
          <p className="text-paragraph-small text-content-tertiary">센터이름</p>
        </div>
      </div>
    </main>
  );
};

export default AwaitingApproval;
