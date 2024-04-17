import { useDispatch, useSelector } from 'react-redux';
import { setQueries } from '../slices/dataSlice';
import { toast } from 'react-toastify';
import {
  useAllQueriesMutation,
  useQueryMutation,
} from '../slices/queryApiSlice';

function useQuery() {
  const { userInfo } = useSelector((state) => state.auth);
  const { queries } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const [allQueries] = useAllQueriesMutation();

  const [query] = useQueryMutation();

  const getQueries = async () => {
    try {
      const res = await allQueries({
        email: userInfo?.email,
        role: userInfo?.role,
      }).unwrap();

      dispatch(setQueries(res?.queries));
    } catch (err) {
      toast.error(err?.data?.message || err.error, { position: 'top-right' });
    }
  };

  const getQuery = async (id) => {
    try {
      const res = await query({
        email: userInfo?.email,
        queryId: id.toString(),
        role: userInfo?.role,
      }).unwrap();

      return res?.query;
    } catch (err) {
      toast.error(err?.data?.message || err.error, { position: 'top-right' });
    }
  };

  return {
    getQueries,
    getQuery,
  };
}

export default useQuery;
