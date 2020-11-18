import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

import serverSideEvents from '../services/serverSideEvents';
import { initializeCategories } from '../reducer/categoryReducer';
import { logout } from '../reducer/tokenReducer';

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
  const history = useHistory();
  let sse;
  const connectToSSE = () => {
    serverSideEvents.getStreamCode()
    .then(code => {
      sse = serverSideEvents.establishSSE(code, username);
      sse.onmessage = e => {
        if (e.data === 'logout') {
          dispatch(logout());
          history.push('/');
        } else {
          dispatch(initializeCategories());
        }
      }
    })
  }

  connectToSSE();

  useInterval(() => {
    if (sse.readyState === 2 || !navigator.onLine) {
      sse.close();
      connectToSSE();
      if (sse.readyState !== 2 || navigator.onLine) dispatch(initializeCategories());
    };
  }, 3000);

  return(<></>)
}

export default SSEListener;