import React from 'react';

const getTimeStamp = (id) => {
  if (!id) return '';
  const timestamp = ('' + id).toString().substring(0, 8);
  const date = new Date(parseInt(timestamp, 16) * 1000);
  return date.toLocaleString();
};

function Query({ query, action }) {
  return (
    <div
      className='m-2 p-4 border group rounded-xl min-w-fit  cursor-pointer bg-white space-y-4 transition-shadow shadow-md hover:shadow-lg hover:bg-purple-600 hover:text-white '
      onClick={() => action(query)}
    >
      <div className='flex items-center justify-between w-100'>
        <h2 className='text-indigo-800 group-hover:text-white opacity-90 text-xl font-semibold'>
          <span className='uppercase'>
            QN{query._id.toString().substring(0, 5)}
          </span>{' '}
          - {query.title}
        </h2>
        <div className='bg-green-50 font-semibold text-sm text-green-600 px-4 py-1 rounded-md'>
          {query.status}
        </div>
      </div>
      <div className='flex items-center justify-between w-100'>
        <div className='bg-purple-50 text-sm text-purple-600 px-3 py-1 rounded-md'>
          {query.category}
        </div>
        <div className='text-gray-500  group-hover:text-white text-sm text-end'>
          {getTimeStamp(query._id)}
        </div>
      </div>
    </div>
  );
}

export default Query;
