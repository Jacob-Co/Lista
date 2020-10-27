import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import { initializeFriendCategories } from '../reducer/friendCategoryReducer';

const FriendCategories = styled.div`
  margin-left: 1rem;
`

const FriendCategoriesView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const friendCategories = useSelector(state => state.friendCategories);

  useEffect(() => {
    dispatch(initializeFriendCategories(id));
  }, [dispatch])

  return (
    <FriendCategories>
      <h2>Currently Working On:</h2>
      <p>{friendCategories.length > 0 
        ? friendCategories[0].name
        : 'Loading'}
      </p>
      <h2>Other Categories</h2>
      {friendCategories.length > 0 
        ? friendCategories.slice(1).map(category => <p key={category.id}>{category.name}</p>)
        : 'Loading'}
    </FriendCategories>
  );
};

export default FriendCategoriesView;