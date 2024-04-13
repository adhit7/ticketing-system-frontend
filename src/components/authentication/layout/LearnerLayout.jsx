import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LearnerHome from '../../../pages/Learner/LearnerHome';
import Navbar from '../../Navbar';
import CreateQuery from '../../../pages/Learner/CreateQuery';

const LearnerLayout = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<LearnerHome />} />
        <Route path='/learner/query/create' element={<CreateQuery />} />
      </Routes>
    </>
  );
};

export default LearnerLayout;
