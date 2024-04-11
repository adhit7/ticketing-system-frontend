import React from 'react';
import { Route, useOutletContext, Outlet } from 'react-router-dom';
import Navbar from '../Navbar';

function RoleBasedRoute({ roles }) {
  const userInfo = useOutletContext();
  if (userInfo && roles && checkUser(userInfo?.role, roles)) {
    return <Outlet />;
  }

  return <>You are not autorized</>;
}

function checkUser(user, roles) {
  return roles.findIndex((role) => role === user) !== -1;
}

export default RoleBasedRoute;
