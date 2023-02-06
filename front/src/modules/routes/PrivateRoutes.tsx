import { Outlet, Navigate } from 'react-router';
import { useLocation } from 'react-router-dom';

import { CheckTokenByKey } from '../Auth/CheckToken';
import LoadingModal from '../../components/LoadingModal';

export default function PrivateRoute() {
  const location = useLocation();
  const { isAuth } = CheckTokenByKey(location.key);
  // console.log('Location은 지금', location);

  if (isAuth === 'Failed') {
    alert('로그인 해야 합니다.');
    return <Navigate to="/login" />;
  } else if (isAuth === 'Loading') {
    return <LoadingModal />;
  } else {
    return <Outlet />;
  }
}
