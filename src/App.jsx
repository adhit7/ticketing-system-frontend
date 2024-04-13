import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';

import RequireUser from './components/authentication/RequireUser';
import RequireVisitor from './components/authentication/RequireVisitor';

import AdminLayout from './components/authentication/layout/AdminLayout';
import MentorLayout from './components/authentication/layout/MentorLayout';
import LearnerLayout from './components/authentication/layout/LearnerLayout';

import Login from './pages/Login';
import NewPassword from './pages/NewPassword';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <div className='h-screen font-poppins bg-gray-50'>
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
          {/* <Route path='/user/verify-email/:id' element={<ActivationMail />} /> */}
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
