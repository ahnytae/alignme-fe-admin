import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="max-w-lg space-y-6 text-center">
        {/* 404 숫자 */}
        <h1 className="text-8xl font-bold text-indigo-600">404</h1>

        {/* 메인 메시지 */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-900">페이지를 찾을 수 없습니다</h2>
          <p className="text-gray-600">요청하신 페이지가 존재하지 않거나, 삭제되었을 수 있습니다.</p>
        </div>

        {/* 버튼 그룹 */}
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white transition-colors duration-300 hover:bg-indigo-700"
          >
            <Home className="mr-2 h-5 w-5" />
            홈으로 가기
          </button>
        </div>

        {/* 추가 도움말 */}
        {/* <div className="mt-8 text-sm text-gray-500">
          문제가 지속되면
          <a href="/contact" className="text-indigo-600 underline hover:text-indigo-500">
            고객센터
          </a>
          로 문의해주세요.
        </div> */}
      </div>
    </div>
  );
};

export default NotFound;
