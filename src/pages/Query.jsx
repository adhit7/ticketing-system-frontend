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
      className='m-2 p-4 border rounded-xl min-w-fit cursor-pointer bg-white space-y-4'
      onClick={() => action()}
    >
      <div className='flex items-center justify-between gap-10'>
        <h2 className='text-indigo-900 opacity-90 text-xl font-semibold'>
          <span className='uppercase'>
            QN{query._id.toString().substring(0, 5)}
          </span>{' '}
          - {query.title}
        </h2>
        <div className='bg-green-50 font-semibold tracking-wider text-sm text-green-600 px-4 py-1 rounded-md'>
          {query.status}
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <div className='bg-purple-50 tracking-wider text-sm text-purple-600 px-4 py-1 rounded-md'>
          {query.category}
        </div>
        <div className='text-gray-500 text-sm'>{getTimeStamp(query._id)}</div>
      </div>
    </div>
  );
}

export default Query;
