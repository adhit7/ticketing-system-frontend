import React, { useRef, useState } from 'react';
import Chat from './Chat';
import { FaCircle, FaUserCircle } from 'react-icons/fa';

const Conversation = ({ userInfo, messages, action, chatWindowRef }) => {
  const [newMessage, setNewMessage] = useState('');
  // const messages = [
  //   { sender: 'user', content: 'This is a message from the user.' },
  //   { sender: 'assistant', content: 'This is a response from the assistant.' },
  // ];

  return (
    <div className='flex flex-col border-r-2 border-gray-400'>
      <div
        className=' flex relative h-4/6 overflow-y-auto p-5'
        ref={chatWindowRef}
      >
        {messages?.length > 0 ? (
          <div className='flex-grow flex-col'>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex-col ${
                  message?.sender === userInfo?._id
                    ? 'justify-end'
                    : 'justify-start'
                } mb-2`}
              >
                <div
                  className={`flex items-end ${
                    message?.sender === userInfo?._id ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className={`self-start	mx-2`}>
                    <FaUserCircle size={25} className='text-purple-800' />
                  </div>
                  <div
                    className={`max-w-xs rounded-lg px-4 py-2 ${
                      message?.sender === userInfo?._id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200'
                    }`}
                  >
                    {message.content}
                  </div>
                  {/* <span
                  className={`text-xs text-gray-500 flex ${
                    message?.sender === userInfo?._id
                      ? 'justify-self-end'
                      : 'justify-self-start'
                  }`}
                >
                  2 mins ago
                </span> */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex flex-col flex-grow  justify-center items-center w-100'>
            <h2 className='mb-6 text-center text-lg	 font-bold text-gray-500'>
              Query has been assigned and no messages yet! Send one now.
            </h2>
            <img
              src={'https://www.zenclass.in/images/no_messages_student.svg'}
              className='object-contain md:h-48 md:w-96 sm:h-30 sm:w-30'
              alt='Zen Logo'
            />
          </div>
        )}
      </div>

      {userInfo?.role !== 'admin' && (
        <div className='flex items-end px-4 py-2 bg-gray-100 '>
          <input
            type='text'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder='Type your message...'
            className='flex-grow px-4 py-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            onClick={() => action(newMessage, setNewMessage)}
            className='ml-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600'
            disabled={newMessage?.length === 0}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default Conversation;

//                  <FaUserCircle className='text-purple-800 flex-shrink-0' />
