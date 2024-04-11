import React from 'react';
import ZenLogo from '../assets/zen_logo.png';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='border-gray-200 bg-gray-50 dark:bg-indigo-400 dark:border-gray-700'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <a href='#' className='flex items-center space-x-3 rtl:space-x-reverse'>
          <img src={ZenLogo} className='h-10' alt='Zen Logo' />
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
            Zen class
          </span>
        </a>
        <button
          data-collapse-toggle='navbar-solid-bg'
          type='button'
          className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          aria-controls='navbar-solid-bg'
          aria-expanded='false'
        >
          <span className='sr-only'>Open main menu</span>
          <svg
            className='w-5 h-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 17 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 1h15M1 7h15M1 13h15'
            />
          </svg>
        </button>
        <div className='hidden w-full md:block md:w-auto' id='navbar-solid-bg'>
          <ul className='flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700'>
            <NavLink
              to={'/admin/batch/create'}
              className='block py-2 px-3 md:p-0 text-white bg-white-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent'
            >
              Create Batch
            </NavLink>
            <NavLink
              to={'/admin/mentor/create'}
              className='block py-2 px-3 md:p-0 text-white bg-white-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent'
            >
              Create Mentor
            </NavLink>
            <NavLink
              to={'/admin/learner/create'}
              className='block py-2 px-3 md:p-0 text-white bg-white-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent'
            >
              Create Learner
            </NavLink>
            <button
              onClick={() => console.log('logout')}
              className='block py-2 px-3 md:p-0 text-white bg-white-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent'
            >
              Logout
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
