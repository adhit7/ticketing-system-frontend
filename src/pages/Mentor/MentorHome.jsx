import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AllQueries from '../../components/AllQueries';
import useQuery from '../../hooks/useQuery';
import { setQueries } from '../../slices/dataSlice';
import EmptyList from '../../components/EmptyList';

const MentorHome = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { queries } = useSelector((state) => state.data);

  const [queryList, setQueryList] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const filterOptions = ['All', 'Open', 'Closed'];

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
    const queries = await getQueries();
    dispatch(setQueries(queries));
    setSelectedOption('All');
  };

  const handleFilter = () => {
    if (selectedOption === 'Open') {
      setQueryList(queries.filter((item) => item?.status === 'ASSIGNED'));
    } else if (selectedOption === 'Closed') {
      setQueryList(queries.filter((item) => item?.status === 'CLOSED'));
    } else {
      setQueryList(queries);
    }
  };

  return (
    <div>
      <AllQueries
        queries={queryList}
        userInfo={userInfo}
        options={filterOptions}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        content={'No assigned queries for you'}
        classes={'md:h-60 md:w-90'}
      />
    </div>
  );
};

export default MentorHome;
