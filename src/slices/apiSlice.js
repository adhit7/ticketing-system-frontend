import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://ticketing-system-backend-gdz3.onrender.com',
  credentials: 'include',
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Learner', 'Mentor', 'Admin'],
  endpoints: (builder) => ({}),
});
