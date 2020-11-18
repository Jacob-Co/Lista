import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import serverSideEvents from '../services/serverSideEvents'
import { initializeCategories } from '../reducer/categoryReducer';

const useEventSource = (url) => {
  useEffect(() => {
      const source = new EventSource(url);

      source.onmessage = function logEvents(event) {      
          // updateData(JSON.parse(event.data));    
          console.log(`message`) 
      }
  }, [])
}

const SSEListener =  ({ username }) => {
  const dispatch = useDispatch();

  serverSideEvents.getStreamCode()
    .then(code => {
      const sse = serverSideEvents.establishSSE(code, username);
      sse.onmessage = e => {
        console.log(`hello`)
        dispatch(initializeCategories());
      }
    })

  return(<></>)
}

export default SSEListener;