import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AllQueries from '../AllQueries';
import io from 'socket.io-client';
import useQuery from '../../utils/useQuery';

let socket;

const AdminHome = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const { queries } = useSelector((state) => state.data);

  const dispatch = useDispatch();

  const { getQueries } = useQuery();

  useEffect(() => {
    getQueries();
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
