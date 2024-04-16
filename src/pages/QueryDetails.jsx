import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Button from '../components/Button';
import { useAssignQueryMutation } from '../slices/adminApiSlice';
import { toast } from 'react-toastify';

const getTimeStamp = (id) => {
  if (!id) return '';
  const timestamp = ('' + id).toString().substring(0, 8);
  const date = new Date(parseInt(timestamp, 16) * 1000);
  return date.toLocaleString();
};

const labelClass = 'text-sm font-medium text-gray-700';

const QueryDetails = ({ query }) => {
  // let { state: query } = useLocation();

  const { userInfo } = useSelector((state) => state.auth);

  const [assignQuery, { isLoading }] = useAssignQueryMutation();

  const handleQuery = async () => {
    try {
      const res = await assignQuery({
        queryId: query._id.toString(),
        role: 'admin',
      }).unwrap();
      toast.success(res?.message, { position: 'top-right' });
    } catch (err) {
      toast.error(err?.data?.message || err.error, { position: 'top-right' });
    }
  };

  return (
    <>
      {query && (
        <div className={`bg-grey-50`}>
          <h2 className='px-3 py-8 text-indigo-900 opacity-90 text-xl font-semibold w-full border-b border-gray-300 ml-2'>
            <span className='uppercase'>
              QN{query?._id?.toString().substring(0, 5)}
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
              <p>
                {query.status === 'ASSIGNED'
                  ? query.assignedMentorName
                  : 'UNASSIGNED'}
              </p>
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
          {userInfo?.role === 'admin' && query.status !== 'ASSIGNED' && (
            <div className='flex justify-center mt-5'>
              <Button
                label='Assign Mentor'
                loading={isLoading}
                message='Assigning'
                classes={'md:w-3/12 my-3'}
                onClick={handleQuery}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default QueryDetails;
