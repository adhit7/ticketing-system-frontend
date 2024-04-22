import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AllQueries from '../../components/AllQueries';
import useQuery from '../../hooks/useQuery';
import { setQueries } from '../../slices/dataSlice';

const MentorHome = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { queries } = useSelector((state) => state.data);

  const [queryList, setQueryList] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(true);
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
    setLoading(false);
  };

  const handleFilter = () => {
    setLoading(true); // Indicate that filtering is in progress

    let filteredList = queries; // Initialize with the original list
    if (selectedOption === 'Open') {
      filteredList = queries.filter((item) => item?.status === 'ASSIGNED');
    } else if (selectedOption === 'Closed') {
      filteredList = queries.filter((item) => item?.status === 'CLOSED');
    } else {
      filteredList = queries;
    }

    // Set the filtered list and turn off loading
    setQueryList(filteredList);
    setLoading(false); // Indicate that filtering is complete
  };

  return (
    <div>
      <AllQueries
        queries={queryList}
        userInfo={userInfo}
        options={filterOptions}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        loading={loading}
        content={'No assigned queries for you'}
        classes={'md:h-60 md:w-90'}
      />
    </div>
  );
};

export default MentorHome;
