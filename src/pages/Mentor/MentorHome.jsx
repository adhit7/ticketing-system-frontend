import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AllQueries from '../AllQueries';
import { toast } from 'react-toastify';
import { useMentorQueriesMutation } from '../../slices/mentorApiSlice';

const MentorHome = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [queries, setQueries] = useState([]);
  const [mentorQueries] = useMentorQueriesMutation();

  const handleAllQueries = async () => {
    try {
      const res = await mentorQueries({
        email: userInfo?.email,
        role: 'mentor',
      }).unwrap();
      console.log('1', res);
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

export default MentorHome;
