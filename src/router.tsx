import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ComponentUiTest from './pages/component-ui-test';
import DashboardPage from './pages/dashboard/dashboardPage';
import DashboardCreatePage from './pages/content/contentCreatePage';
import DashbordContentDetailPage from './pages/content/contentDetailPage';
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
    </Routes>
  );
};

export default Router;
