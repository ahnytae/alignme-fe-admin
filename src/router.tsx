import { Routes, Route } from 'react-router-dom';

import ComponentUiTest from './pages/component-ui-test';
import DashboardPage from './pages/dashboard/dashboardPage';
import DashboardCreatePage from './pages/content/contentCreatePage';
import DashbordContentDetailPage from './pages/content/contentDetailPage';
import { SignupTypePage, LoginPage, SignupFormPage } from './pages/auth';
import SuccessAuthRedirectPage from './pages/auth/SuccessAuthRedirectPage';

const Router = () => {
  return (
    <Routes>
      <Route path="/test" element={<ComponentUiTest />} />

      {/* 대시보드 페이지 */}
      <Route path="/dashboard/content" element={<DashboardPage />} />
      <Route path="/dashboard/member" element={<DashboardPage />} />

      {/* 콘텐츠 페이지 */}
      <Route path="/dashboard/content/create" element={<DashboardCreatePage />} />
      <Route path="/dashboard/content/:id" element={<DashbordContentDetailPage />} />

      {/** 회원가입 페이지 */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/kakao/success" element={<SuccessAuthRedirectPage />} />
      <Route path="/signup-type" element={<SignupTypePage />} />
      <Route path="/signup/:type/info" element={<SignupFormPage />} />
    </Routes>
  );
};

export default Router;
