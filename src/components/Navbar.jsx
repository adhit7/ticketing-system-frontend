import React from 'react';
import ZenLogo from '../assets/zen_logo.png';
import { NavLink, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useAdminLogoutMutation } from '../slices/adminApiSlice';
import { removeCredentials } from '../slices/authSlice';
import { removeQueries } from '../slices/dataSlice';

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  const roleRoutes = {
    admin: [
      { name: 'Create Batch', route: '/admin/batch/create' },
      { name: 'Create Mentor', route: '/admin/mentor/create' },
      { name: 'Create Learner', route: '/admin/learner/create' },
    ],
    mentor: [],
    learner: [{ name: 'Create Query', route: '/learner/query/create' }],
  };

  const [adminLogout] = useAdminLogoutMutation();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      //It is common for all roles to remove cookies and local storage
      await adminLogout();
      dispatch(removeQueries());
      dispatch(removeCredentials());
    } catch (err) {
      toast.error(err?.data?.message || err.error, { position: 'top-right' });
    }
  };

  return (
    <nav className='bg-indigo-500 text-white'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <NavLink
          to='/'
          className='flex items-center space-x-3 rtl:space-x-reverse'
        >
          <img src={ZenLogo} className='h-10' alt='Zen Logo' />
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
            Zen class
          </span>
        </NavLink>
        <button
          data-collapse-toggle='navbar-solid-bg'
          type='button'
          className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden sm:block hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
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
          <ul className='flex flex-col font-medium mt-4 rounded-lg bg-indigo-400 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent'>
            {userInfo &&
              roleRoutes?.[userInfo?.role]?.map((item) => (
                <NavLink
                  key={item.route}
                  to={item.route}
                  className={`block py-2 px-3 rounded md:text-white ${
                    item?.route == pathname ? 'bg-indigo-700 p-2' : ''
                  }`}
                >
                  {item.name}
                </NavLink>
              ))}
            <button
              onClick={logoutHandler}
              className={`text-start block py-2 px-3 rounded md:bg-transparent md:text-white`}
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
