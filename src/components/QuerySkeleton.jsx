import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonItem = () => (
  <div className='m-2 p-4 border group rounded-xl min-w-fit  cursor-pointer bg-white space-y-4 transition-shadow shadow-md hover:shadow-lg hover:bg-indigo-500 hover:text-white h-70'></div>
);

const QuerySkeleton = () => {
  return (
    <div className='md:w-[75%] sm:w-[85%] overflow-y-auto overflow-y-hidden h-full'>
      <SkeletonItem>
        <Skeleton />
      </SkeletonItem>
    </div>
  );
};

export default QuerySkeleton;
