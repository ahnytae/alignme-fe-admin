import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // TODO : 전역상태로 변경 필요
  const isLogin = false;

  return isLogin ? <Outlet /> : <Navigate to={'/login'} />;
};

export default PrivateRoute;
