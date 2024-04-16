import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MentorHome from '../../../pages/Mentor/MentorHome';
import Navbar from '../../Navbar';
import QueryFullDetails from '../../../pages/QueryFullDetails';

const MentorLayout = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<MentorHome />} />
        <Route path='/mentor/query/:id' element={<QueryFullDetails />} />
      </Routes>
    </>
  );
};

export default MentorLayout;
