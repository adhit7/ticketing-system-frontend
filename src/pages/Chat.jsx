import classNames from 'classnames';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

function ChatHeader() {
  return (
    <div className='flex justify-end bg-white p-4'>
      <div className='bg-green-50 font-semibold tracking-wider text-sm text-green-600 px-4 py-1 rounded-md'>
        QQQQQ
      </div>
    </div>
  );
}

const Message = ({ message }) => {
  const self = message.from;
  return (
    <>
      <div class='flex-shrink-0 h-10 w-10 rounded-full bg-gray-300'>
        <FaUserCircle className='text-purple-800 flex-shrink-0' />
      </div>
      <div>
        <div class='bg-gray-300 p-3 rounded-r-lg rounded-bl-lg'>
          <p class='text-sm'>
            Lorem ipsum dolor sit amet, consectetur adipiscinvbbg elit.
          </p>
        </div>
        <span class='text-xs text-gray-500 leading-none'>2 min ago</span>
      </div>
    </>
  );
};

function ChatMessage({
  messages = [
    { from: 'Me', content: 'Hello Hello' },
    { from: 'Me', content: 'Hello Hello2' },
  ],
}) {
  return (
    // <div className="flex flex-col overflow-auto p-8 flex-grow ">
    <>
      {messages.map((message, index) => (
        <Message message={message} key={index} />
      ))}
    </>
  );
}

const Chat = () => {
  return (
    <>
      <ChatHeader />
      <ChatMessage />
    </>
  );
};

export default Chat;
