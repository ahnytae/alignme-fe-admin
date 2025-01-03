import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ComponentUiTest from './pages/component-ui-test';
import ContentListPage from './pages/content/contentListPage';
import ContentCreatePage from './pages/content/contentCreatePage';
import ContentDetailPage from './pages/content/contentDetailPage';

import MemberListPage from './pages/member/memberListPage';
import MemberRequestPage from './pages/member/memberRequestPage';

import { SignupTypePage, LoginPage, SignupFormPage } from './pages/auth';
import MyPage from './pages/myPage/myPage';
import SuccessAuthRedirectPage from './pages/auth/SuccessAuthRedirectPage';
import Sidebar from './components/Sidebar';
import { PATH } from './constant/urls';
import PrivateRoute from '@/components/PrivateRoute';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';
import { Suspense } from 'react';
import LoadingSpinner from './components/ui/loadingSpinner';

import 'react-toastify/dist/ReactToastify.css';
import InstructorListPage from './pages/instructor/instructorListPage';
import InstructorRequestPage from './pages/instructor/instructorRequestPage';
import RegistrationPendingPage from './components/RegistrationPendingPage';

const Router = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Navigate to={PATH.login} />} />
          {/* <Route element={<PrivateRoute />}> */}
          {/** 회원가입 페이지 */}
          <Route path={PATH.login} element={<LoginPage />} />
          <Route path={PATH.auth_kakao_success} element={<SuccessAuthRedirectPage />} />
          <Route path={PATH.signupType} element={<SignupTypePage />} />
          <Route path={PATH.signup_type_info} element={<SignupFormPage />} />
          {/* 가입 대기 페이지 */}
          <Route path={PATH.signup_pending} element={<RegistrationPendingPage />} />

          <Route element={<Sidebar />}>
            {/** 콘텐츠 관리 */}
            <Route path={PATH.content_list} element={<ContentListPage />} />
            <Route path={PATH.content_create} element={<ContentCreatePage isEditMode={false} />} />
            <Route path={PATH.content_id} element={<ContentDetailPage />} />
            <Route path={PATH.content_edit} element={<ContentCreatePage isEditMode={true} />} />

            {/* 강사 관리 */}
            <Route path={PATH.instructor_list} element={<InstructorListPage />} />
            <Route path={PATH.instructor_request} element={<InstructorRequestPage />} />

            {/* 회원 관리 */}
            <Route path={PATH.member_list} element={<MemberListPage />} />
            <Route path={PATH.member_request} element={<MemberRequestPage />} />

            {/* 마이페이지 */}
            <Route path={PATH.myPage} element={<MyPage />} />
          </Route>
          {/* </Route> */}
        </Routes>
      </Suspense>
      <ToastContainer position="top-center" limit={1} closeButton={false} autoClose={4000} hideProgressBar />
    </ErrorBoundary>
  );
};

export default Router;
