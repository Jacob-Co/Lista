import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { switchCategoryIndexes } from '../reducer/categoryReducer';

import TaskList from './TaskList';

const WorkingOnDiv = styled.div`
  padding-bottom: .5rem;
  border-bottom: .15rem solid;
`

const ContentDiv = styled.div`
  margin-left: .5rem;
`

const WorkingOn = ({ category, categoryList, viewOnly }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    if (!category.workingOn && category.extraInfo !== null) return;
    dispatch(switchCategoryIndexes(0, 0, categoryList))
  }

  return(
    <>
    <WorkingOnDiv>
      <h2>Currently Working On:</h2>
      <ContentDiv>
        <h3>{category.name}</h3>
        { category.tasks.length > 0
          ? <TaskList tasks={category.tasks}/>
          : ""
        }
        { viewOnly || category.extraInfo !== null
          ? "" 
          : <button onClick={handleRemove}>remove</button>
        }
      </ContentDiv>
    </WorkingOnDiv>
    </>
      );
};

export default WorkingOn;
