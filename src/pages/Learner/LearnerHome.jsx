import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetAllQueriesMutation } from '../../slices/learnerApiSlice';
import AllQueries from '../AllQueries';
import { toast } from 'react-toastify';

const LearnerHome = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [queries, setQueries] = useState([]);
  const [getAllQueries] = useGetAllQueriesMutation();

  const handleAllQueries = async () => {
    try {
      const res = await getAllQueries({
        email: userInfo?.email,
        role: 'learner',
      }).unwrap();
      setQueries(res?.queries);
    } catch (err) {
      toast.error(err?.data?.message || err.error, { position: 'top-right' });
    }
  };

  useEffect(() => {
    handleAllQueries();
  }, []);
  return (
    <div>
      {queries?.length > 0 && (
        <AllQueries queries={queries} role={userInfo?.role} />
      )}
    </div>
  );
};

export default LearnerHome;
