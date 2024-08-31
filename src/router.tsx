import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ComponentUiTest from './pages/component-ui-test';
import { SignupTypePage, SignupPage, SignupFormPage } from './pages/auth/sign_up';

const Router = () => {
  return (
    <Routes>
      <Route path="/test" element={<ComponentUiTest />} />
      <Route path="/signup-type" element={<SignupTypePage />} />
      <Route path="/signup/:type" element={<SignupPage />} />
      <Route path="/signup/:type/info" element={<SignupFormPage />} />
    </Routes>
  );
};

export default Router;
