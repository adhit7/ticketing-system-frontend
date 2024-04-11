import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:4000',
  credentials: 'include',
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Learner', 'Mentor', 'Admin'],
  endpoints: (builder) => ({}),
});
