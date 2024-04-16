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
    mentorTempPassword: builder.mutation({
      query: (data) => ({
        url: `${MENTOR_URL}/temp-password`,
        method: 'POST',
        body: data,
      }),
    }),
    mentorLogout: builder.mutation({
      query: () => ({
        url: `${MENTOR_URL}/logout`,
        method: 'POST',
      }),
    }),
    mentorQueries: builder.mutation({
      query: ({ email, role }) => ({
        url: `${MENTOR_URL}/query/all/${email}/${role}`,
        method: 'GET',
      }),
    }),
    mentorQuery: builder.mutation({
      query: ({ email, queryId, role }) => ({
        url: `${MENTOR_URL}/query/${email}/${queryId}/${role}`,
        method: 'GET',
      }),
    }),
    startConversation: builder.mutation({
      query: (data) => ({
        url: `${MENTOR_URL}/start-conversation`,
        method: 'POST',
        body: data,
      }),
    }),
    sendMessage: builder.mutation({
      query: (data) => ({
        url: `${MENTOR_URL}/send-message`,
        method: 'POST',
        body: data,
      }),
    }),
    mentorConversation: builder.mutation({
      query: ({ conversationId, role }) => ({
        url: `${MENTOR_URL}/${conversationId}/messages/${role}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useMentorLoginMutation,
  useMentorForgotPasswordMutation,
  useMentorNewPasswordMutation,
  useMentorTempPasswordMutation,
  useMentorLogoutMutation,
  useMentorQueriesMutation,
  useMentorQueryMutation,
  useStartConversationMutation,
  useSendMessageMutation,
  useMentorConversationMutation,
} = mentorApiSlice;
