import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';

import { getSentToItems } from '../reducer/sentToItemReducer';

const GivenCategoriesTasks = () => {
  const dispatch = useDispatch();
  const sentToItems = useSelector(state => state.sentToItems);
  let socket;

  useEffect(() => {
    socket = io();
    dispatch(getSentToItems());
  }, [])


  return(
    <div>
      <h2>{'Given Categories & Tasks'}</h2>
    </div>
  )
}

export default GivenCategoriesTasks