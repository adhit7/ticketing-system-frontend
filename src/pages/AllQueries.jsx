import React from 'react';
import Query from './Query';
import { useNavigate } from 'react-router-dom';

const AllQueries = ({ queries, role }) => {
  const navigate = useNavigate();

  return (
    <div className='flex items-center flex-col overflow-hidden max-h-screen p-4'>
      <div className='w-[75%] mx-auto overflow-auto'>
        {queries.map((query) => (
          <Query
            key={query._id}
            query={query}
            action={() =>
              navigate(`/${role}/query/${query._id.toString()}`, {
                state: query,
              })
            }
          />
        ))}
      </div>
    </div>
  );
};

export default AllQueries;
