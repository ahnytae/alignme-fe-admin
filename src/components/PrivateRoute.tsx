import useAuthStore from '@/stores/useAuthStore';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isLogin = useAuthStore((state) => state.isLogin);

  return isLogin ? <Outlet /> : <Navigate to={'/login'} />;
};

export default PrivateRoute;
