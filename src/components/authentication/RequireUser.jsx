import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AdminLayout from './layout/AdminLayout';
import MentorLayout from './layout/MentorLayout';
import LearnerLayout from './layout/LearnerLayout';

const RequireUser = () => {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);

  if (userInfo) {
    switch (userInfo?.role) {
      case 'admin':
        return <AdminLayout />;
      case 'mentor':
        return <MentorLayout />;
      case 'learner':
        return <LearnerLayout />;
      default:
        return (
          <Navigate
            to={'/learner/login'}
            state={{ from: location.pathname }}
            replace
          />
        );
    }
    // return <Outlet />;
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
