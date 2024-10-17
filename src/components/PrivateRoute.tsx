import { PATH } from '@/constant/urls';
import useAuthStore from '@/stores/useAuthStore';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { isLogin } = useAuthStore((state) => ({ isLogin: state.isLogin, isLoading: state.isLoading }));
  // return isLogin ? <Outlet /> : <Navigate to={PATH.login} />;
  return <Outlet />;
};

export default PrivateRoute;
