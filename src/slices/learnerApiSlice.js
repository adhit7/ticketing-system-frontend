import { apiSlice } from './apiSlice';
const LEARNER_URL = '/learner';

export const learnerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    learnerLogin: builder.mutation({
      query: (data) => ({
        url: `${LEARNER_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    learnerForgotPassword: builder.mutation({
      query: (data) => ({
        url: `${LEARNER_URL}/forgot-password`,
        method: 'PUT',
        body: data,
      }),
    }),
    learnerNewPassword: builder.mutation({
      query: (data) => ({
        url: `${LEARNER_URL}/new-password`,
        method: 'PUT',
        body: data,
      }),
    }),
    learnerTempPassword: builder.mutation({
      query: (data) => ({
        url: `${LEARNER_URL}/temp-password`,
        method: 'POST',
        body: data,
      }),
    }),
    learnerLogout: builder.mutation({
      query: () => ({
        url: `${LEARNER_URL}/logout`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useLearnerLoginMutation,
  useLearnerForgotPasswordMutation,
  useLearnerNewPasswordMutation,
  useLearnerLogoutMutation,
  useLearnerTempPasswordMutation,
} = learnerApiSlice;
