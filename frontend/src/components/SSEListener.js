import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'

import { initializeSSE, closeSSEConnection, setSSEOnMessage } from '../reducer/sseReducer'
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
  })
}

const SSEListener =  ({ username }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sse = useSelector(state => state.sse);
  let currentReadyState;
  let onlineState = navigator.onLine;

  useEffect(() => {
    dispatch(initializeSSE(username))
  }, [dispatch])

  if (sse) {
    dispatch(setSSEOnMessage(e => {
      if (e.data === 'logout') {
        dispatch(closeSSEConnection());
        dispatch(logout());
        history.push('/');
      } else {
        dispatch(initializeCategories());
      }
    }));
    currentReadyState = sse.readyState;
  }

  useInterval(() => {
    // Redispatch initializeCategory after going offline then online again
    if (navigator.onLine === false) {
      onlineState = false;
    } else if (navigator.onLine === true && onlineState === false) {
      onlineState = true;
      dispatch(initializeCategories());
    }
  }, 3000);

  return(<></>)
}

export default SSEListener;