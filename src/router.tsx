import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ComponentUiTest from './pages/component-ui-test';
import { SignupTypePage, SignupPage, SignupFormPage } from './pages/auth/sign_up';
import SignInPage from './pages/auth/sign_in/SignInPage';

const Router = () => {
  return (
    <Routes>
      <Route path="/test" element={<ComponentUiTest />} />

      {/** 로그인 페이지 */}
      <Route path="/signin" element={<SignInPage />} />

      {/** 회원가입 페이지 */}
      <Route path="/signup-type" element={<SignupTypePage />} />
      <Route path="/signup/:type" element={<SignupPage />} />
      <Route path="/signup/:type/info" element={<SignupFormPage />} />
    </Routes>
  );
};

export default Router;
