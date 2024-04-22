import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonItem = () => (
  <div className='bg-white w-3/4 transition-shadow shadow-md mb-5'>
    <Skeleton className='w-100 h-24' />
  </div>
);

const QuerySkeleton = ({ count = 5 }) => {
  return (
    <>
      {Array(count)
        .fill(1)
        .map((_, index) => (
          // render your skeleton here
          <SkeletonItem key={`skeleton-${index}`} />
        ))}
    </>
  );
};

export default QuerySkeleton;
