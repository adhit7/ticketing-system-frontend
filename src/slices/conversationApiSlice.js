import { apiSlice } from './apiSlice';
const CONVERSATION_URL = '/conversation';

export const conversationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    startConversation: builder.mutation({
      query: (data) => ({
        url: `${CONVERSATION_URL}/start-conversation`,
        method: 'POST',
        body: data,
      }),
    }),
    sendMessage: builder.mutation({
      query: (data) => ({
        url: `${CONVERSATION_URL}/send-message`,
        method: 'POST',
        body: data,
      }),
    }),
    allConversation: builder.mutation({
      query: ({ conversationId, role }) => ({
        url: `${CONVERSATION_URL}/${conversationId}/messages/${role}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useAllConversationMutation,
  useSendMessageMutation,
  useStartConversationMutation,
} = conversationApiSlice;
