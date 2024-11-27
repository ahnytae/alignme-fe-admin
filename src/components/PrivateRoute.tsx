import { excludePath } from '@/constant/protectedUrl';
import { PATH } from '@/constant/urls';
import useAuthStore from '@/stores/useAuthStore';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

const PrivateRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
