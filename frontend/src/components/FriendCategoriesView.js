import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { initializeFriendCategories } from '../reducer/friendCategoryReducer';
import FriendTasksView from './FriendTasksView';

const FriendCategories = styled.div`
  margin-left: .75rem;
`

const CategoryHeader = styled.div`
  font-size: 1.1em;
  font-weight: bold;
  margin-left: .75rem;
  padding-bottom: .75rem;
`

const FriendCategoriesView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const friendCategories = useSelector(state => state.friendCategories);
  const friend = useSelector(state => state.friends
    .find(friend => friend.id === id))

  useEffect(() => {
    dispatch(initializeFriendCategories(id));
  }, [dispatch])

  const handleRefresh = () => {
    dispatch(initializeFriendCategories(id))
  }

  const capitalize = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  }

  return (
    <FriendCategories>
      <h1>{friend ? capitalize(friend.username) : ""} Categories: </h1>
      <h2>Currently Working On:</h2>
      <div><CategoryHeader>{friendCategories.length > 0 
        ? <div>{friendCategories[0].name}
            {friendCategories[0].tasks.length > 0
              ? <FriendTasksView tasks={friendCategories[0].tasks}/>
              : ""
            }
          </div>
        : 'Loading'}
      </CategoryHeader></div>
      <h2>Other Categories:</h2>
      {friendCategories.length > 0 
        ? friendCategories.slice(1).map(category => <div key={category.id}>
            <CategoryHeader>{category.name}
              {category.tasks.length > 0
                ? <FriendTasksView tasks={category.tasks}/>
                : ""
              }
            </CategoryHeader>
          </div>)
        : 'Loading'}
      <Link to="/"><button>back</button></Link>
      <button onClick={handleRefresh}>refresh</button>
    </FriendCategories>
  );
};

export default FriendCategoriesView;