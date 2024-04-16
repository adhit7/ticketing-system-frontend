import React from 'react';
import Conversation from '../Conversation';
import QueryDetails from '../QueryDetails';

const QueryFullDetails = () => {
  return (
    <div className='grid md:grid-cols-2 gap-4 p-3 h-full'>
      <Conversation />
      <QueryDetails />
    </div>
  );
};

export default QueryFullDetails;
