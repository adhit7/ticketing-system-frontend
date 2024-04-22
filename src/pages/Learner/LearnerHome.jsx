import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AllQueries from '../../components/AllQueries';
import useQuery from '../../hooks/useQuery';
import { setQueries } from '../../slices/dataSlice';

const LearnerHome = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { queries } = useSelector((state) => state.data);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const { getQueries } = useQuery();

  useEffect(() => {
    handleQueries();
  }, []);

  const handleQueries = async () => {
    const queries = await getQueries();
    dispatch(setQueries(queries));
    setLoading(false);
  };

  return (
    <div>
      <AllQueries
        queries={queries}
        userInfo={userInfo}
        loading={loading}
        content={'You have not raised any queries!'}
        classes={'md:h-60 md:w-90'}
      />
    </div>
  );
};

export default LearnerHome;
