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
  // const connectToSSE = () => {
  //   serverSideEvents.getStreamCode()
  //   .then(code => {
  //     sse = serverSideEvents.establishSSE(code, username);
  //     sse.onmessage = e => {
  //       if (e.data === 'logout') {
  //         dispatch(logout());
  //         history.push('/');
  //       } else {
  //         dispatch(initializeCategories());
  //       }
  //     }
  //   })
  // }

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
    }))
  }

  // useInterval(() => {
  //   if 
  //   if (sse) {
  //     if (sse.readyState === 2 || !navigator.onLine) {
  //       dispatch(closeSSEConnection);
  //       dispatch(initializeSSE);
  //       console.log(`here`)
  //       if (sse.readyState !== 2 || navigator.onLine) dispatch(initializeCategories());
  //     };
  //   }
  // }, 3000);

  return(<></>)
}

export default SSEListener;