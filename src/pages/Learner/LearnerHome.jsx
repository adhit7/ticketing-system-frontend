import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AllQueries from '../AllQueries';
import useQuery from '../../utils/useQuery';

const LearnerHome = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const { queries } = useSelector((state) => state.data);

  const { getQueries } = useQuery();

  useEffect(() => {
    getQueries();
  }, []);

  return (
    <div>
      {queries?.length > 0 && (
        <AllQueries queries={queries} userInfo={userInfo} />
      )}
    </div>
  );
};

export default LearnerHome;
