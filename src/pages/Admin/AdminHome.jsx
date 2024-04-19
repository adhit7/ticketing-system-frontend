import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AllQueries from '../AllQueries';
import useQuery from '../../utils/useQuery';

const AdminHome = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { queries } = useSelector((state) => state.data);

  const [assignedQueries, setAssignedQueries] = useState([]);
  const [unAssignedQueries, setUnAssignedQueries] = useState([]);

  const { getQueries } = useQuery();

  useEffect(() => {
    getQueries();
  }, []);

  useEffect(() => {
    if (queries?.length > 0) {
      const assignQueries = queries
        ?.filter((item) => item?.status === 'ASSIGNED')
        ?.slice(0, 5);
      setAssignedQueries(assignQueries);
      const unAssignQueries = queries
        ?.filter((item) => item?.status === 'UNASSIGNED')
        ?.slice(0, 5);
      setUnAssignedQueries(unAssignQueries);
    }
  }, [queries]);

  return (
    <div>
      {queries?.length > 0 && (
        <AllQueries queries={queries} role={userInfo?.role} />
      )}
    </div>
  );
};

export default AdminHome;
