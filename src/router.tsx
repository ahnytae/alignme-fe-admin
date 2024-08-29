import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ComponentUiTest from './pages/component-ui-test';

const Router = () => {
  return (
    <Routes>
      <Route path="/test" element={<ComponentUiTest />} />
    </Routes>
  );
};

export default Router;
