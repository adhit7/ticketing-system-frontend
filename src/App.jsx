import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { ToastContainer } from 'react-toastify';

import RequireUser from './components/authentication/RequireUser';
import RequireVisitor from './components/authentication/RequireVisitor';

import AdminLayout from './components/authentication/layout/AdminLayout';
import MentorLayout from './components/authentication/layout/MentorLayout';
import LearnerLayout from './components/authentication/layout/LearnerLayout';

import Login from './pages/Visitor/Login';
import NewPassword from './pages/Visitor/NewPassword';
import ForgotPassword from './pages/Visitor/ForgotPassword';

function App() {
  return (
    <div className='h-screen font-poppins'>
      <Routes>
        <Route path='*' element={<RequireUser />}>
          <Route path='admin/*' element={<AdminLayout />} />
          <Route path='mentor/*' element={<MentorLayout />} />
          <Route path='learner/*' element={<LearnerLayout />} />
        </Route>

        <Route element={<RequireVisitor />}>
          <Route path='admin'>
            <Route path='login' exact element={<Login />} />
          </Route>

          <Route path='learner'>
            <Route path='login' exact element={<Login />} />
            <Route path='new-password/:token' element={<NewPassword />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
          </Route>

          <Route path='mentor'>
            <Route path='login' exact element={<Login />} />
            <Route path='new-password/:token' element={<NewPassword />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
