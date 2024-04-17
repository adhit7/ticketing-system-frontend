import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AllQueries from '../AllQueries';
import useQuery from '../../utils/useQuery';

const MentorHome = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { queries } = useSelector((state) => state.data);

  const dispatch = useDispatch();

  const { getQueries } = useQuery();

  useEffect(() => {
    getQueries();
  }, []);

  return (
    <div>
      {queries?.length > 0 && (
        <AllQueries queries={queries} role={userInfo?.role} />
      )}
    </div>
  );
};

export default MentorHome;
