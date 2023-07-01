import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, loggedIn, ...rest }) => {
  if (loggedIn === null) {
    return null;
  }

  return loggedIn ? (
    <Component {...rest} />
  ) : (
    <Navigate to='/' replace={true} />
  );
};

export default ProtectedRoute;
