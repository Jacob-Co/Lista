import React, { useEffect } from 'react';
import io from 'socket.io-client';

const GivenCategoriesTasks = () => {
  let socket;

  useEffect(() => {
    socket = io();
  }, [])


  return(
    <div>
      <h2>{'Given Categories & Tasks'}</h2>
    </div>
  )
}

export default GivenCategoriesTasks