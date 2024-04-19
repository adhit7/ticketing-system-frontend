import React, { useState } from 'react';
import Query from './Query';
import { useNavigate } from 'react-router-dom';

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState('Assigned');
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className='relative '>
      <div>
        <button
          type='button'
          className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
          id='menu-button'
          aria-expanded='true'
          aria-haspopup='true'
          onClick={toggleDropdown}
        >
          {selectedOption}
          <svg
            className='-mr-1 ml-2 h-5 w-5'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='menu-button'
          tabIndex='-1'
        >
          <div className='py-1' role='none'>
            <a
              href='#'
              className={`text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 ${
                selectedOption === 'Assigned' ? 'bg-gray-100 text-gray-900' : ''
              }`}
              role='menuitem'
              tabIndex='-1'
              id='menu-item-0'
              onClick={() => selectOption('Assigned')}
            >
              Assigned
            </a>
            <a
              href='#'
              className={`text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 ${
                selectedOption === 'Unassigned'
                  ? 'bg-gray-100 text-gray-900'
                  : ''
              }`}
              role='menuitem'
              tabIndex='-1'
              id='menu-item-1'
              onClick={() => selectOption('Unassigned')}
            >
              Unassigned
            </a>
            <a
              href='#'
              className={`text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 ${
                selectedOption === 'Solved' ? 'bg-gray-100 text-gray-900' : ''
              }`}
              role='menuitem'
              tabIndex='-1'
              id='menu-item-2'
              onClick={() => selectOption('Solved')}
            >
              Solved
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

const AllQueries = ({ queries, label = '' }) => {
  const navigate = useNavigate();

  const handleNavigate = (query) => {
    navigate(`/${userInfo?.role}/query/${query._id.toString()}`, {
      state: query,
    });
  };

  return (
    <div className='flex items-center flex-col overflow-hidden min-h-screen p-4'>
      <div className='w-75 flex justify-end'>
        <Dropdown />
      </div>

      <div className='w-75 overflow-y-auto overflow-y-hidden h-full'>
        {queries.map((query) => (
          <Query key={query._id} query={query} action={handleNavigate} />
        ))}
      </div>
    </div>
  );
};

export default AllQueries;
