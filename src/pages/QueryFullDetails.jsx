import React, { useEffect, useRef, useState } from 'react';
import Conversation from './Conversation';
import QueryDetails from './QueryDetails';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useQuery from '../utils/useQuery';
import useConversation from '../utils/useConversation';
import { io } from 'socket.io-client';
import Modal from '../components/Modal';

let socket;

const QueryFullDetails = () => {
  let { state } = useLocation();
  const { userInfo } = useSelector((state) => state.auth);

  const [query, setQuery] = useState(null);
  const [messages, setMessages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  const chatWindowRef = useRef(null);

  const { solveQuery } = useQuery();
  const { getAllConversation, sentMessage } = useConversation();

  useEffect(() => {
    if (query === null) {
      setQuery(state);
    }
  }, [state]);

  useEffect(() => {
    if (query?.conversationId) {
      handleConversation();
    }
  }, [query]);

  useEffect(() => {
    socket = io('http://localhost:4000');
    socket.emit('setup', userInfo);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on('message received', (newMessageRecieved) => {
      setMessages([...messages, newMessageRecieved]);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('message received');
      socket.off('setup', userInfo);
    };
  });

  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

  const handleConversation = async () => {
    const conversationData = await getAllConversation(
      query.conversationId?.toString()
    );
    setMessages(conversationData?.messages);
    if (!socketConnected) {
      console.log('First');
      socket.emit('join chat', conversationData?._id);
      setSocketConnected(true);
    }
  };

  const handleMessages = async (newMessage, setNewMessage) => {
    const data = await sentMessage(query?._id, newMessage);
    const receiverId =
      userInfo?.role === 'mentor' ? query?.raisedBy : query?.assignedTo;

    if (!socketConnected) {
      console.log('Second', data);
      socket.emit('join chat', data?._id);
      setSocketConnected(true);
    }

    socket.emit('new message', query?.conversationId, userInfo, {
      ...data?.message,
      receiverId: receiverId,
    });
    setMessages([...messages, data?.message]);
    setNewMessage('');
    scrollToBottom();
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCloseQuery = async (solution) => {
    const updatedQuery = await solveQuery(query?._id, solution);
    setQuery(updatedQuery);
  };

  return (
    <div className='grid md:grid-cols-2 gap-4 p-3 mb-5 bg-white'>
      {query && (
        <>
          <Conversation
            userInfo={userInfo}
            messages={messages}
            action={handleMessages}
            chatWindowRef={chatWindowRef}
            status={query?.status}
            solution={query?.solution}
          />
          <QueryDetails
            query={query}
            setQuery={setQuery}
            userInfo={userInfo}
            handleOpenModal={handleOpenModal}
          />
          <Modal
            isOpen={modalOpen}
            onClose={handleCloseModal}
            queryId={query?.id}
            handleCloseQuery={handleCloseQuery}
          />
        </>
      )}
    </div>
  );
};

export default QueryFullDetails;
