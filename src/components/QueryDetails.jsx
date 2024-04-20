import React from 'react';
import Button from './Button';
import { useAssignQueryMutation } from '../slices/adminApiSlice';
import { toast } from 'react-toastify';
import { getTimeStamp } from '../utils/time';

const labelClass = 'text-sm font-medium text-gray-700';

const QueryDetails = ({ query, userInfo, handleOpenModal }) => {
  //Admin Funtcionality
  const [assignQuery, { isLoading }] = useAssignQueryMutation();
  const handleQuery = async () => {
    try {
      const res = await assignQuery({
        queryId: query._id.toString(),
        role: 'admin',
      }).unwrap();
      setQuery(res?.query);
      toast.success(res?.message, { position: 'top-right' });
    } catch (err) {
      toast.error(err?.data?.message || err.error, { position: 'top-right' });
    }
  };

  return (
    <div className={`md:order-last order-first bg-white`}>
      <h2 className='px-3 py-8 text-indigo-900 opacity-90 text-xl font-semibold w-full border-b border-gray-300 md:ml-2'>
        <span className='uppercase'>
          QN{query?._id?.toString().substring(0, 5)}
        </span>{' '}
        - {query.title}
      </h2>
      <div className='grid grid-cols-1 lg:grid-cols-[max-content_1fr] gap-x-4 gap-y-4 md:ml-2'>
        <div className='p-3'>
          <p className={`${labelClass}`}>Created at:</p>
          <p>{getTimeStamp(query._id)}</p>
        </div>
        <div className='p-3'>
          <p className={`${labelClass}`}>Assigned to:</p>
          <p>
            {query?.assignedMentorName?.length > 0
              ? query.assignedMentorName
              : 'UNASSIGNED'}
          </p>
        </div>
        <div className='max-w-md  p-3'>
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
      {query.status === 'UNASSIGNED' && userInfo?.role === 'admin' && (
        <div className='md:p-3 mt-5'>
          <Button
            label='Assign Mentor'
            loading={isLoading}
            message='Assigning'
            classes={'md:w-3/12 my-3'}
            onClick={handleQuery}
          />
        </div>
      )}
      {query.status === 'ASSIGNED' && (
        <div className='md:p-3 mt-5'>
          <Button
            label='Close the query'
            message='Closing'
            classes={'md:w-3/12 my-3'}
            onClick={handleOpenModal}
          />
        </div>
      )}
    </div>
  );
};

export default QueryDetails;
