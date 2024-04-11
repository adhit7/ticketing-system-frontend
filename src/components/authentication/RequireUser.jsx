import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Navbar';

const RequireUser = ({ roles }) => {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);

  if (userInfo) {
    if (roles && checkUser(userInfo?.role, roles)) {
      return (
        <>
          <Navbar />
          <Outlet />
        </>
      );
    } else {
      return <>You are not autorized</>;
    }
  }

  return (
    <Navigate
      to={'/learner/login'}
      state={{ from: location.pathname }}
      replace
    />
  );
};

function checkUser(user, roles) {
  return roles.findIndex((role) => role === user) !== -1;
}

export default RequireUser;
