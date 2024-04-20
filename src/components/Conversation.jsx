import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { formatDate } from '../utils/time';
import EmptyList from './EmptyList';

const Conversation = ({
  userInfo,
  messages,
  action,
  chatWindowRef,
  status,
  solution,
}) => {
  const [newMessage, setNewMessage] = useState('');
  const sender =
    userInfo?.role === 'admin' && messages?.length > 0
      ? messages[0]?.sender
      : userInfo?._id;

  return (
    <div className='bg-gray-100 flex flex-col sm:border-r-2 sm:border-gray-400 h-screen md:order-first order-last'>
      <div className='bg-white flex justify-end px-4 py-2'>
        <div className='bg-green-50 font-semibold text-sm text-green-600 px-4 py-2 rounded-md'>
          {status === 'CLOSED' ? 'CLOSED' : 'OPEN'}
        </div>
      </div>
      <div className='p-4 overflow-y-auto' ref={chatWindowRef}>
        {messages?.length > 0 ? (
          <div className='flex-grow flex-col'>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex-col ${
                  message?.sender === sender ? 'justify-end' : 'justify-start'
                } mb-2`}
              >
                <div
                  className={`flex items-end ${
                    message?.sender === sender ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className={`self-start	mx-2`}>
                    <FaUserCircle size={25} className='text-purple-800' />
                  </div>
                  <div
                    className={`max-w-md rounded-lg px-4 py-2 ${
                      message?.sender === sender
                        ? 'bg-white text-black'
                        : 'border border-gray-300 bg-indigo-100'
                    }`}
                  >
                    {message?.content}
                    <div className={`text-xs  text-black`}>
                      {formatDate(message?.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyList
            content={
              status === 'ASSIGNED'
                ? `Query has been assigned and no messages yet! Send one now.`
                : status === 'UNASSIGNED' &&
                  `Query will be soon assigned to your batch mentor.`
            }
          />
        )}
      </div>

      {status === 'ASSIGNED' && userInfo?.role !== 'admin' && (
        <div className='flex mt-auto px-4 py-2 bg-gray-100 '>
          <input
            type='text'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder='Type your message...'
            className='flex-grow px-4 py-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400'
          />
          <button
            onClick={() => action(newMessage, setNewMessage)}
            className='ml-2 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500'
            disabled={newMessage?.length === 0}
          >
            Send
          </button>
        </div>
      )}

      {status === 'CLOSED' && (
        <div className='mt-auto px-4 py-2 bg-white w-100'>
          <p className='text-md text-indigo-900 mb-1'>Solution</p>
          <p className='text-lg text-black-500'>{solution}</p>
        </div>
      )}
    </div>
  );
};

export default Conversation;
