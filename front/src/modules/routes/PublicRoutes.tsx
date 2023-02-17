//
import { Outlet, Navigate } from 'react-router';
import { useLocation } from 'react-router-dom';

//
import { CheckTokenByKey } from '../Auth/CheckToken';
import LoadingModal from '../../components/LoadingModal';
import Swal from "sweetalert2";

export default function PublicRoute({}) {
  const location = useLocation();
  const { isAuth } = CheckTokenByKey(location.key);

  if (isAuth === 'Success') {
    Swal.fire({icon:'success', text:'비로그인 전용.'});
    return <Navigate to="/" />;
  } else if (isAuth === 'Loading') {
    return <LoadingModal />;
  }

  return <Outlet />;
}
