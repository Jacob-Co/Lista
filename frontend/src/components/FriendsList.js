import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { initializeFriends } from '../reducer/friendReducer';

const FriendListDiv = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 3rem;
`

const FriendsList = () => {
  const dispatch = useDispatch();
  const friends = useSelector(state => state.friends);

  useEffect(() => {
    dispatch(initializeFriends());
  }, [dispatch])

  return (
    <FriendListDiv>
      <h3>Friends: </h3>
      {friends.map(friend => <div key={friend.id}>{friend.username}</div>)}
    </FriendListDiv>
  )
}

export default FriendsList;