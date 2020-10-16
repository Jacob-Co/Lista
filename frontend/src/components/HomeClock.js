import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setDate } from '../reducer/dateReucer';

const HomeClock = () => {
  const dispatch = useDispatch()
  const date = useSelector(state => state.date);

  useEffect(() => {
    dispatch(setDate());
  }, [dispatch])

  retrun (
    <div>
      1/1/2020
      00:00:00
    </div>
  )
}

export default HomeClock;