import React from 'react';
import { Link } from 'react-router-dom';

import ZenLogo from '../assets/zen_logo.png';

const FormHeader = ({ children }) => (
  <div className='sm:mx-auto sm:w-full sm:max-w-md'>
    <div className='flex justify-center items-center'>
      <Link to='/'>
        <img src={ZenLogo} className='h-12 w-12' alt='Zen Logo' />
      </Link>
    </div>
    <h2 className='mt-6 mb-6 text-center text-3xl font-extrabold text-gray-900'>
      {children}
    </h2>
  </div>
);

export default FormHeader;
