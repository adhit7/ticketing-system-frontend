import React, { useEffect, useState } from 'react';
import Conversation from './Conversation';
import QueryDetails from './QueryDetails';
import {
  useMentorConversationMutation,
  useMentorQueryMutation,
  useSendMessageMutation,
  useStartConversationMutation,
} from '../slices/mentorApiSlice';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const QueryFullDetails = () => {
  let { state } = useLocation();
  const [query, setQuery] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);

  const [messages, setMessages] = useState([]);

  const [refresh, setRefresh] = useState(0);

  const [mentorQuery] = useMentorQueryMutation();

  const [startConversation] = useStartConversationMutation();

  const [sendMessage] = useSendMessageMutation();

  const [mentorConversation] = useMentorConversationMutation();

  const handleQuery = async () => {
    try {
      const res = await mentorQuery({
        email: userInfo?.email,
        queryId: query._id.toString(),
        role: 'mentor',
      }).unwrap();
      setQuery(res?.query);
    } catch (err) {
      toast.error(err?.data?.message || err.error, { position: 'top-right' });
    }
  };

  const handleConversation = async () => {
    try {
      const res = await mentorConversation({
        conversationId: query.conversationId?.toString(),
        role: 'mentor',
      }).unwrap();
      console.log('w', res);
      setMessages(res?.messages);
    } catch (error) {
      toast.error(err?.data?.message || err.error, { position: 'top-right' });
    }
  };

  useEffect(() => {
    if (!query) {
      setQuery(state);
    }
    handleQuery();
  }, [refresh]);

  useEffect(() => {
    if (query?.conversationId && messages?.length === 0) {
      handleConversation();
    }
  }, [query]);

  const handleMessages = async (newMessage, setNewMessage) => {
    try {
      let res;
      if (!query.conversationId) {
        res = await startConversation({
          queryId: query?._id,
          content: newMessage,
          role: 'mentor',
        }).unwrap();
        setNewMessage('');
        setRefresh(refresh + 1);
        console.log('a', res);
      } else {
        res = await sendMessage({
          queryId: query?._id,
          content: newMessage,
          role: 'mentor',
        }).unwrap();
        setNewMessage('');
        setRefresh(refresh + 1);
        console.log('2', res);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error, { position: 'top-right' });
    }
  };

  return (
    <div className='grid md:grid-cols-2 gap-4 p-3 h-full'>
      <Conversation messages={messages} action={handleMessages} />

      {query && <QueryDetails query={query} />}
    </div>
  );
};

export default QueryFullDetails;
