import { PATH } from '@/constant/urls';
import useAuthStore from '@/stores/useAuthStore';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const excludePath: string[] = [
  PATH.login,
  PATH.auth_kakao_success,
  PATH.signupType,
  PATH.signup_type_info,
  PATH.signup_pending,
];

const PrivateRoute = () => {
  const location = useLocation();

  const { isLogin } = useAuthStore((state) => ({ isLogin: state.isLogin }));

  if (excludePath.includes(location.pathname)) {
    return <Outlet />;
  }

  if (!isLogin) {
    return <Navigate to={PATH.login} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
