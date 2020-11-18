import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import serverSideEvents from '../services/serverSideEvents'
import { initializeCategories } from '../reducer/categoryReducer';

const useInterval = (callback, miliSeconds) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback])

  useEffect(() => {
    if (miliSeconds !== null) {
      let intervalId = setInterval(savedCallback.current, miliSeconds);
      return () => clearInterval(intervalId);
    }
  }, [miliSeconds])
}

const SSEListener =  ({ username }) => {
  const dispatch = useDispatch();
  let sse;
  const connectToSSE = () => {
    serverSideEvents.getStreamCode()
    .then(code => {
      sse = serverSideEvents.establishSSE(code, username);
      sse.onmessage = e => {
        console.log(`hello`)
        dispatch(initializeCategories());
      }
    })
  }

  connectToSSE();

  useInterval(() => {
    if (sse.readyState === 2 || !navigator.onLine) {
      sse.close();
      connectToSSE();
    };
  }, 1000);

  return(<></>)
}

export default SSEListener;