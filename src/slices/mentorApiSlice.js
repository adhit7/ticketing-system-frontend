import { apiSlice } from './apiSlice';
const MENTOR_URL = '/mentor';

export const mentorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    mentorLogin: builder.mutation({
      query: (data) => ({
        url: `${MENTOR_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    mentorForgotPassword: builder.mutation({
      query: (data) => ({
        url: `${MENTOR_URL}/forgot-password`,
        method: 'PUT',
        body: data,
      }),
    }),
    mentorNewPassword: builder.mutation({
      query: (data) => ({
        url: `${MENTOR_URL}/new-password`,
        method: 'PUT',
        body: data,
      }),
    }),
    mentorLogout: builder.mutation({
      query: () => ({
        url: `${MENTOR_URL}/logout`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useMentorLoginMutation,
  useMentorForgotPasswordMutation,
  useMentorNewPasswordMutation,
  useMentorLogoutMutation,
} = mentorApiSlice;
