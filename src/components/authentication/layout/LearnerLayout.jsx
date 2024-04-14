import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LearnerHome from '../../../pages/Learner/LearnerHome';
import Navbar from '../../Navbar';
import CreateQuery from '../../../pages/Learner/CreateQuery';
import QueryDetails from '../../../pages/QueryDetails';

const LearnerLayout = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<LearnerHome />} />
        <Route path='/learner/query/create' element={<CreateQuery />} />
        <Route path='/learner/query/:id' element={<QueryDetails />} />
      </Routes>
    </>
  );
};

export default LearnerLayout;
