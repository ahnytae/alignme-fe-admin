import { PATH } from '@/constant/urls';
import useAuthStore from '@/stores/useAuthStore';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { isLogin } = useAuthStore((state) => ({ isLogin: state.isLogin, isLoading: state.isLoading }));
  console.log('d', isLogin);
  return isLogin ? <Outlet /> : <Navigate to={PATH.login} />;
};

export default PrivateRoute;
