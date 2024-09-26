import { Routes, Route } from 'react-router-dom';

import ComponentUiTest from './pages/component-ui-test';
import DashboardPage from './pages/dashboard/dashboardPage';
import DashboardCreatePage from './pages/content/contentCreatePage';
import DashbordContentDetailPage from './pages/content/contentDetailPage';
import { SignupTypePage, LoginPage, SignupFormPage } from './pages/auth';
import MyPage from './pages/myPage/myPage';
import SuccessAuthRedirectPage from './pages/auth/SuccessAuthRedirectPage';
import Sidebar from './components/Sidebar';
import { PATH } from './constant/urls';

const Router = () => {
  return (
    <Routes>
      <Route path="/test" element={<ComponentUiTest />} />
      <Route element={<Sidebar />}>
        {/** 콘텐츠 관리 */}
        <Route path={PATH.content_list} element={<DashboardPage />} />
        <Route path={PATH.content_create} element={<DashboardCreatePage />} />
        <Route path={PATH.content_id} element={<DashbordContentDetailPage />} />

        {/* 강사 관리 */}
        <Route path={PATH.instructor_list} element={<div>강사 목록</div>} />
        <Route path={PATH.instructor_request} element={<div>강사 가입 요청</div>} />

        {/* 회원 관리 */}
        <Route path={PATH.member_list} element={<div>회원 목록</div>} />
        <Route path={PATH.member_request} element={<div>회원 가입 요청</div>} />

        {/* 마이페이지 */}
        <Route path={PATH.myPage} element={<MyPage />} />
      </Route>

      {/** 회원가입 페이지 */}
      <Route path={PATH.login} element={<LoginPage />} />
      <Route path={PATH.auth_kakao_success} element={<SuccessAuthRedirectPage />} />
      <Route path={PATH.signupType} element={<SignupTypePage />} />
      <Route path={PATH.signup_type_info} element={<SignupFormPage />} />
    </Routes>
  );
};

export default Router;
