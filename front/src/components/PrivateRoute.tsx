import React from 'react';
import { Navigate, Route } from 'react-router-dom';

export default function PrivateRoute() {
  const location = useLocation();
  const { isAuth } = CheckToken(location.key);

  if (isAuth === 'Failed') {
    return <Navigate to="/user/login" />;
  } else if (isAuth === 'Loading') {
    return <LoadingModal />;
  }

  return <Outlet />;
}
