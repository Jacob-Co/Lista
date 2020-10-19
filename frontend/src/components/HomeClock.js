import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import { newDate, advanceUNIX } from '../reducer/dateReducer';


function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const HomeClock = () => {
  const dispatch = useDispatch()
  const date = useSelector(state => state.date);

  useInterval(() => {
    dispatch(advanceUNIX(date.UNIX));
    // console.log(date.original.getDay() !== new Date(date.UNIX).getDay())
    // console.log(date.original.getDay())
    // console.log(new Date(date.UNIX).getDay())
    if (date.original.getDay() !== new Date(date.UNIX).getDay()) {
      window.location.reload();
    }
  }, 1000)

  function formatClock(unix) {
    const newDateObj = new Date(unix)
    const dateArr = newDateObj.toString().split(" ");
    const dayInfo = `${dateArr[0]} ${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`
    const timeZone = dateArr.slice(6);
    const time = dateArr[4];
    // console.log(timeZone)
    return (<div>
      <h3>{dayInfo}</h3>
      <h1>{time}</h1>
      <h3>{timeZone}</h3>
    </div>)
  }

  useEffect(() => {
    dispatch(newDate());
  }, [dispatch])

  useEffect(() => {
    window.onfocus = function() {
      dispatch(newDate());
      console.log(`Time updated`)
    }
  }, [dispatch])

  return (
    <div>
      {formatClock(date.UNIX)}
    </div>
  )
}

export default HomeClock;