import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

import { initializeFriends } from '../reducer/friendReducer';
import { initializeFriendCategories } from '../reducer/friendCategoryReducer';

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

  const clickView = (id) => {
    dispatch(initializeFriendCategories(id));
  }

  return (
    <FriendListDiv>
      <h3>Friends: </h3>
      {friends.map(friend =>
        <div key={friend.id}>{friend.username}
          <Link to={`/friend/categories`}>
            <button onClick={() => clickView(friend.id)}>
              view
            </button>
          </Link>
        </div>)}
    </FriendListDiv>
  )
}

export default FriendsList;