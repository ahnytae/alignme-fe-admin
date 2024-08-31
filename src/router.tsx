import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ComponentUiTest from './pages/component-ui-test';
import SignupTypePage from './pages/auth/sign-up/SignupTypePage';
import SignupPage from './pages/auth/sign-up/SignupPage';

const Router = () => {
  return (
    <Routes>
      <Route path="/test" element={<ComponentUiTest />} />
      <Route path="/signup-type" element={<SignupTypePage />} />
      <Route path="/signup/:type" element={<SignupPage />} />
    </Routes>
  );
};

export default Router;
