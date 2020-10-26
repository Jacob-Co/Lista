import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'

import { initializeFriends } from '../reducer/friendReducer';
import { initializeFriendCategories } from '../reducer/friendCategoryReducer';

const FriendListDiv = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 3rem;
`

const FriendsList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const friends = useSelector(state => state.friends);

  useEffect(() => {
    dispatch(initializeFriends());
  }, [dispatch])

  const clickView = async (id) => {
    await dispatch(initializeFriendCategories(id));
    history.push('/friend/categories');
  }

  return (
    <FriendListDiv>
      <h3>Friends: </h3>
      {friends.map(friend =>
        <div key={friend.id}>{friend.username}
            <button onClick={() => clickView(friend.id)}>
              view
            </button>
        </div>)}
    </FriendListDiv>
  )
}

export default FriendsList;