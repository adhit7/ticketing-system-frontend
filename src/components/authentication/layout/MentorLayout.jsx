import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MentorHome from '../../../pages/Mentor/MentorHome';
import Navbar from '../../Navbar';

const MentorLayout = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<MentorHome />} />
      </Routes>
    </>
  );
};

export default MentorLayout;
