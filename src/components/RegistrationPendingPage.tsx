import React from 'react';
import { Clock, CheckCircle, ArrowLeft } from 'lucide-react';

const RegistrationPendingPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      {/* 메인 컨테이너 */}
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-lg">
        {/* 상단 아이콘 */}
        <div className="flex justify-center">
          <div className="relative">
            <Clock className="h-20 w-20 animate-pulse text-blue-500" />
            <div className="absolute -bottom-1 -right-1">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* 텍스트 섹션 */}
        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900">가입 승인 대기 중</h1>
          <p className="text-gray-600">
            레슨장 대표강사님의 가입 신청이 접수되었습니다. 관리자 검토 후 승인이 완료되면 알림을 보내드립니다.
          </p>
        </div>

        {/* 진행 상태 */}
        <div className="space-y-4">
          <div className="rounded-lg bg-gray-100 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">승인 진행률</span>
              <span className="text-sm text-blue-600">검토중</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-gray-200">
              <div className="h-full w-1/3 animate-pulse rounded-full bg-blue-500" />
            </div>
          </div>
        </div>

        {/* 예상 소요 시간 */}
        <div className="rounded-lg bg-blue-50 p-4">
          <p className="text-center text-sm text-blue-700">평균 승인 소요시간: 1시간 이내</p>
        </div>

        {/* 버튼 */}
        <div className="space-y-3">
          <button
            onClick={() => window.location.replace('/login')}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
            이전 페이지로 돌아가기
          </button>
        </div>

        {/* 하단 문의 정보 */}
        <div className="text-center text-sm text-gray-500">
          <p>문의사항이 있으신가요?</p>
          <a href="tel:1234-5678" className="text-blue-600 hover:underline">
            카카오톡
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPendingPage;
