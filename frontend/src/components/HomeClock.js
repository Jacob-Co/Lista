import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setDate } from '../reducer/dateReucer';

const HomeClock = () => {
  const dispatch = useDispatch()
  const dateUNIX = useSelector(state => state.date);
  const date = new Date(dateUNIX).toString();

  useEffect(() => {
    dispatch(setDate());
  }, [dispatch])

  return (
    <div>
      1/1/2020
      00:00:00 <br/>
      {date}
    </div>
  )
}

export default HomeClock;