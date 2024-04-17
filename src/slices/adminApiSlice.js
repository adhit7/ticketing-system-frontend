import { apiSlice } from './apiSlice';
const ADMIN_URL = '/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    adminLogout: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/logout`,
        method: 'POST',
      }),
    }),
    createBatch: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/batch/create`,
        method: 'POST',
        body: data,
      }),
    }),
    getBatches: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/batch/all`,
        method: 'GET',
      }),
    }),
    createMentor: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/mentor/create`,
        method: 'POST',
        body: data,
      }),
    }),
    createLearner: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/learner/create`,
        method: 'POST',
        body: data,
      }),
    }),
    assignQuery: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/query/assign`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useCreateBatchMutation,
  useCreateMentorMutation,
  useGetBatchesMutation,
  useCreateLearnerMutation,
  useAssignQueryMutation,
} = adminApiSlice;
