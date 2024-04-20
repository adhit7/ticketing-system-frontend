import { useDispatch, useSelector } from 'react-redux';
import { setQueries } from '../slices/dataSlice';
import { toast } from 'react-toastify';
import {
  useAllQueriesMutation,
  useCloseQueryMutation,
  useQueryMutation,
} from '../slices/queryApiSlice';

function useQuery() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [allQueries] = useAllQueriesMutation();

  const [query] = useQueryMutation();

  const [closeQuery] = useCloseQueryMutation();

  const getQueries = async () => {
    try {
      const res = await allQueries({
        email: userInfo?.email,
        role: userInfo?.role,
      }).unwrap();

      return res?.queries;
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

  const solveQuery = async (id, solution) => {
    try {
      const res = await closeQuery({
        queryId: id.toString(),
        solution,
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
    solveQuery,
  };
}

export default useQuery;
