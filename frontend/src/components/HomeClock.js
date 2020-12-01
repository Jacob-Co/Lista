import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { newDate, advanceUNIX, setDisplay } from '../reducer/dateReducer';

const ClockContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const ClockDiv = styled.div`
  display: flex;
  align-items: center;
`

const TimeDiv = styled.div`
  font-size: ${props => (props.type === 'time zone' ? '1em' : '1.3em')};
  margin-right: .5em;
`
const MoreInfoDiv = styled.div`
  font-size: 1.05em;
  border: 2px solid;
  border-radius: 50%;
  cursor: help;
`

const useInterval = (callback, delay) => {
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
  const displayType = useSelector( state => state.date.display );

  useInterval(() => {
    dispatch(advanceUNIX(date.UNIX));
    if (date.original.getDay() !== new Date(date.UNIX).getDay()) {
      window.location.reload();
    }
  }, 1000)

  function formatClock(unix, type) {
    console.log(type)
    const newDateObj = new Date(unix)
    const dateArr = newDateObj.toString().split(" ");
    const dateInfo = `${dateArr[0]} ${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`
    const timeZone = dateArr.slice(6).join(" ");
    const time = dateArr[4];
    let timeOptions;
    let nextDisplay;

    if (type === 'date') {
      timeOptions = dateInfo;
      nextDisplay = 'time zone';
    } else if (type === 'time zone') {
      timeOptions = timeZone;
      nextDisplay = 'time';
    } else {
      timeOptions = time;
      nextDisplay = 'date';
    }

    return (<ClockDiv>
      <TimeDiv type={type}>{timeOptions}</TimeDiv>
      <MoreInfoDiv onClick={() => dispatch(setDisplay(nextDisplay))}>&#8505;</MoreInfoDiv>
    </ClockDiv>)
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
    <ClockContainer>
      {formatClock(date.UNIX, displayType)}
    </ClockContainer>
  )
}

export default HomeClock;