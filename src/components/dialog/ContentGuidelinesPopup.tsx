import { Camera, Ban, Check } from 'lucide-react';

const ContentGuidelinesPopup = ({ openModal, closeModal }: { openModal: () => void; closeModal: () => void }) => {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      {/* 모달 오버레이 및 내용 */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50"
        onClick={closeModal} // 오버레이 클릭 시 모달 닫기
      >
        <div
          className="w-96 rounded-lg bg-white p-6 shadow-lg"
          onClick={(e) => e.stopPropagation()} // 모달 내용 클릭 시 오버레이 클릭 이벤트 방지
        >
          <div className="max-w-lg rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-center text-xl font-bold">운동 컨텐츠 등록 가이드</h2>

            <div className="flex flex-col items-center space-y-6">
              <img
                src="/assets/img/pose-guide.png"
                alt="전신 운동 자세 예시"
                className="rounded-lg border-2 border-blue-400"
              />

              <div className="grid w-full grid-cols-1 gap-3">
                <div className="flex items-center rounded-lg bg-blue-50 p-3">
                  <Check className="mr-2 h-6 w-6 shrink-0 text-blue-600" />
                  <p className="text-sm">머리부터 발끝까지 전신 촬영</p>
                </div>

                <div className="flex items-center rounded-lg bg-blue-50 p-3">
                  <Camera className="mr-2 h-6 w-6 shrink-0 text-blue-600" />
                  <p className="text-sm">정면 또는 측면에서 촬영</p>
                </div>

                <div className="flex items-center rounded-lg bg-red-50 p-3">
                  <Ban className="mr-2 h-6 w-6 shrink-0 text-red-600" />
                  <p className="text-sm">부적절한 자세나 잘린 이미지는 등록 불가</p>
                </div>
              </div>

              <button onClick={openModal} className="rounded-full bg-blue-500 px-6 py-3 text-white">
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ContentGuidelinesPopup;