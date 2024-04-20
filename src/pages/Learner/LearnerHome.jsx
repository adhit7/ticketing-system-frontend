import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AllQueries from '../../components/AllQueries';
import useQuery from '../../hooks/useQuery';
import { setQueries } from '../../slices/dataSlice';

const LearnerHome = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { queries } = useSelector((state) => state.data);

  const dispatch = useDispatch();

  const { getQueries } = useQuery();

  useEffect(() => {
    handleQueries();
  }, []);

  const handleQueries = async () => {
    const queries = await getQueries();
    dispatch(setQueries(queries));
  };

  return (
    <div>
      {queries?.length > 0 && (
        <AllQueries queries={queries} userInfo={userInfo} />
      )}
    </div>
  );
};

export default LearnerHome;
