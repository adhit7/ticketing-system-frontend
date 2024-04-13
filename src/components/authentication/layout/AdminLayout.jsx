import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminHome from '../../../pages/Admin/AdminHome';
import CreateBatch from '../../../pages/Admin/CreateBatch';
import CreateMentor from '../../../pages/Admin/CreateMentor';
import CreateLearner from '../../../pages/Admin/CreateLearner';
import Navbar from '../../Navbar';

const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<AdminHome />} />
        <Route path='/admin/batch/create' element={<CreateBatch />} />
        <Route path='/admin/mentor/create' element={<CreateMentor />} />
        <Route path='/admin/learner/create' element={<CreateLearner />} />
      </Routes>
    </>
  );
};

export default AdminLayout;
