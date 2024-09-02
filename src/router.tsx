import { Routes, Route } from 'react-router-dom';

import ComponentUiTest from './pages/component-ui-test';
import { SignupTypePage, LoginPage, SignupFormPage } from './pages/auth';

const Router = () => {
  return (
    <Routes>
      <Route path="/test" element={<ComponentUiTest />} />

      {/** 회원가입 페이지 */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup-type" element={<SignupTypePage />} />
      <Route path="/signup/:type/info" element={<SignupFormPage />} />
    </Routes>
  );
};

export default Router;
