import React from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';
import Query from './Query';
import EmptyList from './EmptyList';

const AllQueries = ({
  userInfo,
  queries,
  options,
  selectedOption = '',
  setSelectedOption,
  content,
  classes,
}) => {
  const navigate = useNavigate();

  const handleNavigate = (query) => {
    navigate(`/${userInfo?.role}/query/${query._id.toString()}`, {
      state: query,
    });
  };

  return (
    <div className='flex items-center flex-col overflow-hidden min-h-screen p-4'>
      {selectedOption !== '' && (
        <div className='w-[75%] px-3 mx-2 flex justify-end '>
          <Dropdown
            options={options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </div>
      )}

      <div className='md:w-[75%] sm:w-[85%] overflow-y-auto overflow-y-hidden h-full'>
        {queries?.length > 0 ? (
          queries?.map((query) => (
            <Query key={query._id} query={query} action={handleNavigate} />
          ))
        ) : (
          <EmptyList content={content} classes={classes} />
        )}
      </div>
    </div>
  );
};

export default AllQueries;
