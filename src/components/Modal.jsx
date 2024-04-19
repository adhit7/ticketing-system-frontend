import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Modal = ({ isOpen, onClose, handleCloseQuery }) => {
  const [solution, setSolution] = useState('');

  const handleInputChange = (e) => {
    setSolution(e.target.value);
  };

  const handleSubmit = () => {
    if (solution?.length === 0) {
      return toast.error(`You can't submit the solution empty`, {
        position: 'top-right',
      });
    }
    console.log('4455');
    handleCloseQuery(solution);
    // Reset input value
    setSolution('');
    // Close modal
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
          <div className='relative w-full max-w-lg p-10 my-6 mx-auto bg-white rounded-md shadow-lg'>
            {/* Content */}
            <div className='text-center'>
              <div className='mb-4'>
                <h1 className='text-xl font-semibold'>Tell us the solution</h1>
              </div>
              <div className='mb-5'>
                <input
                  type='text'
                  value={solution}
                  onChange={handleInputChange}
                  className='w-full px-4 py-4 border rounded-md border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  placeholder='Type your solution here...'
                />
              </div>
              <div className='flex justify-center'>
                <button
                  onClick={handleSubmit}
                  className='mr-2 px-4 py-2 hover:bg-indigo-500	 gap-3 justify-center py-2 px-4 border border-indigo-500  text-sm font-medium text-base rounded-md hover:text-white focus:ring-1 focus:ring-indigo-500 text-indigo-500'
                >
                  Submit
                </button>
                <button
                  onClick={onClose}
                  className='mr-2 px-4 py-2 hover:bg-indigo-500	 gap-3 justify-center py-2 px-4 border border-indigo-500  text-sm font-medium text-base rounded-md hover:text-white focus:ring-1 focus:ring-indigo-500 text-indigo-500'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isOpen && <div className='fixed inset-0 z-40 bg-black opacity-50'></div>}
    </>
  );
};

export default Modal;
