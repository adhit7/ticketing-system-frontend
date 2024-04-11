import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';

import Home from './pages/Home';
import Login from './pages/Login';

import RequireUser from './components/authentication/RequireUser';
import RequireVisitor from './components/authentication/RequireVisitor';
import RoleBasedRoute from './components/authentication/RoleBasedRoute';
import CreateBatch from './pages/CreateBatch';
import CreateMentor from './pages/CreateMentor';

function App() {
  return (
    <div className='h-screen font-poppins bg-gray-50'>
      <Routes>
        <Route element={<RequireUser roles={['admin']} />}>
          <Route index path='/' element={<Home />} />
          <Route path='admin/batch/create' element={<CreateBatch />} />
          <Route path='admin/mentor/create' element={<CreateMentor />} />
        </Route>

        <Route element={<RequireVisitor />}>
          <Route path='admin'>
            <Route path='login' exact element={<Login />} />
          </Route>

          <Route path='learner'>
            <Route path='login' exact element={<Login />} />
            {/* <Route path='new-password/:token' element={<NewPassword />} />
            <Route path='forgot-password' element={<ForgotPassword />} /> */}
          </Route>

          <Route path='mentor'>
            <Route path='login' exact element={<Login />} />
            {/* <Route path='new-password/:token' element={<NewPassword />} />
            <Route path='forgot-password' element={<ForgotPassword />} /> */}
          </Route>
          {/* <Route path='/user/verify-email/:id' element={<ActivationMail />} /> */}
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
