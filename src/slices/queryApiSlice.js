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
  }),
});

export const { useAllQueriesMutation, useQueryMutation } = queryApiSlice;
