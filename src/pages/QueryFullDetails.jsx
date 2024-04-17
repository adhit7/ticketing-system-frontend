import React, { useEffect, useRef, useState } from 'react';
import Conversation from './Conversation';
import QueryDetails from './QueryDetails';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import useQuery from '../utils/useQuery';
import useConversation from '../utils/useConversation';

const QueryFullDetails = () => {
  let { state } = useLocation();
  const [query, setQuery] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);

  const [messages, setMessages] = useState([]);

  const { getQuery, getQueries } = useQuery();

  const { getAllConversation, newConversation, sentMessage } =
    useConversation();

  const chatWindowRef = useRef(null);

  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

  const handleQuery = async (queryId) => {
    const query = await getQuery(queryId);
    if (query) {
      setQuery(query);
    }
    await getQueries();
  };

  const handleConversation = async () => {
    try {
      const conversationData = await getAllConversation(
        query.conversationId?.toString()
      );
      setMessages(conversationData);
    } catch (error) {
      toast.error(err?.data?.message || err.error, { position: 'top-right' });
    }
  };

  useEffect(() => {
    if (!query) {
      setQuery(state);
    }
  }, [state]);

  useEffect(() => {
    if (query?.conversationId) {
      handleConversation();
    }
  }, [query]);

  const handleMessages = async (newMessage, setNewMessage) => {
    try {
      if (!query.conversationId && userInfo?.role === 'mentor') {
        await newConversation(query?._id, newMessage);
        setNewMessage('');
        scrollToBottom();

        //Calling to update query data
        handleQuery(query?._id);
      } else {
        await sentMessage(query?._id, newMessage);
        setNewMessage('');
        scrollToBottom();

        //Calling to update message data
        handleConversation();
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error, { position: 'top-right' });
    }
  };

  return (
    <div className='grid md:grid-cols-2 gap-4 p-3 h-full'>
      <Conversation
        userInfo={userInfo}
        messages={messages}
        action={handleMessages}
        chatWindowRef={chatWindowRef}
      />

      {query && <QueryDetails query={query} />}
    </div>
  );
};

export default QueryFullDetails;
