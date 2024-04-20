import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AllQueries from '../../components/AllQueries';
import useQuery from '../../hooks/useQuery';
import { setQueries } from '../../slices/dataSlice';

const AdminHome = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { queries } = useSelector((state) => state.data);

  const [queryList, setQueryList] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  const dispatch = useDispatch();

  const { getQueries } = useQuery();

  useEffect(() => {
    if (queries?.length === 0 || queryList?.length === 0) {
      handleQueries();
    }
  }, []);

  useEffect(() => {
    if (selectedOption !== '') {
      handleFilter();
    }
  }, [selectedOption]);

  const handleQueries = async () => {
    const data = await getQueries();
    dispatch(setQueries(data));
    setSelectedOption('All');
  };

  const handleFilter = () => {
    if (selectedOption === 'Unassigned') {
      setQueryList(queries.filter((item) => item?.status === 'UNASSIGNED'));
    } else if (selectedOption === 'Open') {
      setQueryList(queries.filter((item) => item?.status === 'ASSIGNED'));
    } else if (selectedOption === 'Closed') {
      setQueryList(queries.filter((item) => item?.status === 'CLOSED'));
    } else {
      setQueryList(queries);
    }
  };

  return (
    <div>
      {queryList?.length > 0 && (
        <AllQueries
          queries={queryList}
          userInfo={userInfo}
          options={['All', 'Unassigned', 'Open', 'Closed']}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      )}
    </div>
  );
};

export default AdminHome;
