import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetAllQueriesMutation } from '../../slices/adminApiSlice';
import AllQueries from '../AllQueries';
import { toast } from 'react-toastify';
import io from 'socket.io-client';

let socket;

const AdminHome = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [queries, setQueries] = useState([]);
  const [getAllQueries] = useGetAllQueriesMutation();

  const handleAllQueries = async () => {
    try {
      const res = await getAllQueries({
        role: 'admin',
      }).unwrap();
      setQueries(res?.queries);
    } catch (err) {
      toast.error(err?.data?.message || err.error, { position: 'top-right' });
    }
  };

  useEffect(() => {
    handleAllQueries();
  }, []);

  // useEffect(() => {
  //   socket = io('http://localhost:4000/');
  //   socket.emit('setup', userInfo);
  //   socket.on('connection', () => {});
  // }, []);

  return (
    <div>
      {queries?.length > 0 && (
        <AllQueries queries={queries} role={userInfo?.role} />
      )}
    </div>
  );
};

export default AdminHome;
