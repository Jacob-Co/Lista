import React from 'react';
import io from 'socket.io-client';

const GivenCategoriesTasks = () => {
  const socket = io();

  return(
    <div>
      <h2>{'Given Categories & Tasks'}</h2>
    </div>
  )
}

export default GivenCategoriesTasks