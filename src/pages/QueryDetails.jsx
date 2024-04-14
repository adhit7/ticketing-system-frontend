import React from 'react';
import { useLocation } from 'react-router-dom';

const getTimeStamp = (id) => {
  if (!id) return '';
  const timestamp = ('' + id).toString().substring(0, 8);
  const date = new Date(parseInt(timestamp, 16) * 1000);
  return date.toLocaleString();
};

const labelClass = 'text-sm font-medium text-gray-700';

const QueryDetails = () => {
  let { state: query } = useLocation();
  return (
    <>
      {query && (
        <div className='bg-grey-50 h-full w-full sm:w-12/12 md:w-6/12 lg:w-6/12'>
          <h2 className='px-3 py-8 text-indigo-900 opacity-90 text-xl font-semibold w-100 border-b border-gray-300 ml-2'>
            <span className='uppercase'>
              QN{query._id.toString().substring(0, 5)}
            </span>{' '}
            - {query.title}
          </h2>
          <div className='grid grid-cols-1 lg:grid-cols-[max-content_1fr] gap-x-4 gap-y-4 ml-2'>
            <div className='p-3'>
              <p className={`${labelClass}`}>Created at:</p>
              <p>{getTimeStamp(query._id)}</p>
            </div>
            <div className='p-3'>
              <p className={`${labelClass}`}>Assigned to:</p>
              <p>{query.status === 'UNASSIGNED' && 'UNASSIGNED'}</p>
            </div>
            <div className='max-w-xs p-3'>
              <p className={`${labelClass}`}>Description:</p>
              <p>{query.description}</p>
            </div>
            <div className='p-3'>
              <p className={`${labelClass}`}>Preferred Language:</p>
              <p>{query.preferredLanguage}</p>
            </div>
            <div className='p-3'>
              <p className={`${labelClass}`}>Category:</p>
              <p>{query.category}</p>
            </div>
            <div className='p-3'>
              <p className={`${labelClass}`}>Sub-Category:</p>
              <p>{query.subCategory}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QueryDetails;
