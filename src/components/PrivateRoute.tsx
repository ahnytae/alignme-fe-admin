import { PATH } from '@/constant/urls';
import useAuthStore from '@/stores/useAuthStore';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { isLogin, isLoading } = useAuthStore((state) => ({ isLogin: state.isLogin, isLoading: state.isLoading }));

  if (isLoading) {
    return <div>login,,,</div>;
  }

  return isLogin ? <Outlet /> : <Navigate to={PATH.login} />;
};

export default PrivateRoute;
