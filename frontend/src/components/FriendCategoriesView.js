import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { initializeFriendCategories } from '../reducer/friendCategoryReducer';

const FriendCategories = styled.div`
  margin-left: .75rem;
`

const FriendCategoriesView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const friendCategories = useSelector(state => state.friendCategories);
  const friend = useSelector(state => state.FriendCategories
    .find(friend => friend.id === id))

  useEffect(() => {
    dispatch(initializeFriendCategories(id));
  }, [dispatch])

  const handleRefresh = () => {
    dispatch(initializeFriendCategories(id))
  }

  return (
    <FriendCategories>
      <h1>{friend.username} Categories: </h1>
      <h2>Currently Working On:</h2>
      <p>{friendCategories.length > 0 
        ? friendCategories[0].name
        : 'Loading'}
      </p>
      <h2>Other Categories:</h2>
      {friendCategories.length > 0 
        ? friendCategories.slice(1).map(category => <p key={category.id}>{category.name}</p>)
        : 'Loading'}
      <Link to="/"><button>back</button></Link>
      <button onClick={handleRefresh}>refresh</button>
    </FriendCategories>
  );
};

export default FriendCategoriesView;