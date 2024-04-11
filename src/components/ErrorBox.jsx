import React from 'react';

const ErrorBox = ({ message }) => (
  <div
    className='sm:mx-auto sm:w-full sm:max-w-md mt-5 p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 m-2'
    role='alert'
  >
    <span className='font-medium sm:ml-6'>{message}</span>
  </div>
);

export default ErrorBox;
