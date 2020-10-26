import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const FriendCategoriesView = () => {
  const friendCategories = useSelector(state => state.friendCategories);

  return (
    <div>
      <h2>Currently Working On:</h2>
      <p>{friendCategories[0].name}</p>
      <h2>Other Categories</h2>
      {friendCategories.slice(1).map(category => <p key={category.id}>{category.name}</p>)}
    </div>
  );
};

export default FriendCategoriesView;