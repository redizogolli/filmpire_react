import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from '../features/auth';

function ProtectedRoute() {
  const { isAuthenticated } = useSelector(userSelector);
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
