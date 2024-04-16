import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminHome from '../../../pages/Admin/AdminHome';
import CreateBatch from '../../../pages/Admin/CreateBatch';
import CreateMentor from '../../../pages/Admin/CreateMentor';
import CreateLearner from '../../../pages/Admin/CreateLearner';
import Navbar from '../../Navbar';
import QueryFullDetails from '../../../pages/Admin/QueryFullDetails';

const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<AdminHome />} />
        <Route path='/admin/batch/create' element={<CreateBatch />} />
        <Route path='/admin/mentor/create' element={<CreateMentor />} />
        <Route path='/admin/learner/create' element={<CreateLearner />} />
        <Route path='/admin/query/:id' element={<QueryFullDetails />} />
      </Routes>
    </>
  );
};

export default AdminLayout;
