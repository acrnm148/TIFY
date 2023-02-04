//
import { Outlet, Navigate } from 'react-router';
import { useLocation } from 'react-router-dom';

//
import { CheckTokenByKey } from '../Auth/CheckToken';
import LoadingModal from '../../components/LoadingModal';

export default function PublicRoute({}) {
  const location = useLocation();
  const { isAuth } = CheckTokenByKey(location.key);

  if (isAuth === 'Success') {
    alert('비로그인 전용.');
    return <Navigate to="/" />;
  } else if (isAuth === 'Loading') {
    return <LoadingModal />;
  }

  return <Outlet />;
}
