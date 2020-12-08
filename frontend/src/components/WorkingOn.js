import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { switchCategoryIndexes, removeWorkingOnTask } from '../reducer/categoryReducer';

import TaskList from './TaskList';
import DroppableTaskList from './DroppableTaskList';

const WorkingOnDiv = styled.div`
  padding-bottom: .5rem;
  border-bottom: ${props => (props.viewOnly ? '' : '.15rem solid')};
`

const ContentDiv = styled.div`
  margin-left: 1.5rem;
`

const RemoveButton = styled.button`
  margin: .75rem 0;
`

const CategoryName = styled.span`
  font-size: 1.07em;
  font-weight: bold;
  margin-right: .5rem;
`
const TaskName = styled.div`
  font-size: 1.07em;
  font-weight: bold;
  margin-right: .5rem;
  margin-bottom: .5rem;
`

const SendToDiv = styled.div`
  margin-left: 1rem;
  font-size: 1.02em;
  font-style: italic;
`

const WorkingOn = ({ category, categoryList, viewOnly }) => {
  const dispatch = useDispatch();
  const username = useSelector(state => state.token.username);
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  const handleRemove = () => {
    if (!category.workingOn && category.extraInfo !== null) return;
    dispatch(switchCategoryIndexes(0, 0, categoryList, username))
  }

  const toggleCreatingTask = () => {
    setIsCreatingTask(!isCreatingTask);
  }

  return(
    <>
    <WorkingOnDiv viewOnly={viewOnly}>
      <h2>Currently Working On:</h2>
      <ContentDiv>
        {category.taskWorkingOn ? <TaskName>{`Task -${category.taskWorkingOn.name}- from:`}</TaskName> : ""}
        <CategoryName>{category.name}</CategoryName>
        { category.tasks && category.tasks.length > 0
          // ? <TaskList tasks={category.tasks} category={category}/>
          ? <DroppableTaskList
              category={category}
              makeTaskWorkingOn={() => ''}
            />
          : ""
        }
        { category.sentTo ? <SendToDiv>{`from: ${category.user.username === username ? 'me' : category.user.username}`}</SendToDiv> : ""}
        { viewOnly || category.extraInfo !== null
          ? "" 
          : <div><RemoveButton onClick={handleRemove}>remove</RemoveButton></div>
        }
      </ContentDiv>
    </WorkingOnDiv>
    </>
      );
};

export default WorkingOn;
