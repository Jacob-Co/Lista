import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { initializeFriendCategories } from '../reducer/friendCategoryReducer';
import TaskList from './TaskList';
import WorkingOn from './WorkingOn';

const FriendCategories = styled.div`
  margin-left: .75rem;
`

const CategoryDiv = styled.div`
  margin-left: .75rem;
  padding-bottom: .75rem;
`

const CategorySpan = styled.span`
  font-size: 1.1em;
  font-weight: bold;
`

const AccomplishedSpan = styled.span`
  text-decoration-line: ${props => (props.isAccomplished ? 'line-through' : 'none')}
`

const SendToDiv = styled.div`
  margin-left: 1rem;
  font-size: 1.02em;
  font-style: italic;
`

const RefreshDiv = styled.div`
  margin-left: 1rem;
  margin-bottom: 1rem;
`

const FriendCategoriesView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const friendCategories = useSelector(state => state.friendCategories);
  const friend = useSelector(state => state.friends
    .find(friend => friend.id === id))
  const myUsername = useSelector(state => state.token.username);

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
      { friendCategories.length > 0 
        ? <WorkingOn category={friendCategories[0]} viewOnly={true}/>
        : 'Loading'
      }
      <h2>Other Projects:</h2>
      <RefreshDiv><button onClick={handleRefresh}>refresh</button></RefreshDiv>
      {friendCategories.length > 0 
        ? friendCategories.slice(1).map(category => <CategoryDiv key={category.id}>
            <div>
              <CategorySpan>
                <AccomplishedSpan isAccomplished={category.accomplished}>
                  {category.name}
                </AccomplishedSpan>
              </CategorySpan>
              {category.tasks.length > 0
                ? <TaskList tasks={category.tasks}> 
                    {category.sentTo
                      ? <SendToDiv>{category.sentTo.username === friend.username 
                        ? `from: ${category.user.username === myUsername ? 'me' : category.user.username}` 
                        :  `sent to: ${category.sentTo.username === myUsername ? 'me' : category.sentTo.username}`}</SendToDiv> 
                      : ""
                    }
                  </TaskList>
                : <>{category.sentTo
                  ? <SendToDiv>{category.sentTo.username === friend.username 
                    ? `from: ${category.user.username}` 
                    :  `sent to: ${category.sentTo.username}`}</SendToDiv> 
                  : ""
                  }</>
              }
            </div>

          </CategoryDiv>)
        : 'Loading'}
      <Link to="/"><button>back</button></Link>
    </FriendCategories>
  );
};

export default FriendCategoriesView;