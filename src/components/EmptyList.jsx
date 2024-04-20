import React from 'react';

const EmptyList = ({ content = '', classes = '' }) => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h2 className='mb-6 text-center text-xl	 font-bold text-gray-500'>
        {content}
      </h2>
      <img
        src={'https://www.zenclass.in/images/no_messages_student.svg'}
        className={`object-contain md:h-48 md:w-96 sm:h-30 sm:w-30 items-center ${classes}`}
        alt='Zen Logo'
      />
    </div>
  );
};

export default EmptyList;
