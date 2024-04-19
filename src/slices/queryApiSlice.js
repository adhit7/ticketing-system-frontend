import { apiSlice } from './apiSlice';
const QUERY_URL = '/query';

export const queryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allQueries: builder.mutation({
      query: ({ email, role }) => ({
        url: `${QUERY_URL}/query/all/${email}/${role}`,
        method: 'GET',
      }),
    }),
    query: builder.mutation({
      query: ({ email, queryId, role }) => ({
        url: `${QUERY_URL}/query/${email}/${queryId}/${role}`,
        method: 'GET',
      }),
    }),
    closeQuery: builder.mutation({
      query: (data) => ({
        url: `${QUERY_URL}/query/close`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useAllQueriesMutation,
  useQueryMutation,
  useCloseQueryMutation,
} = queryApiSlice;
