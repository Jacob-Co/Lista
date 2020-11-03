import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { switchCategoryIndexes } from '../reducer/categoryReducer';

import TaskList from './TaskList';

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

const WorkingOn = ({ category, categoryList, viewOnly }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    if (!category.workingOn && category.extraInfo !== null) return;
    dispatch(switchCategoryIndexes(0, 0, categoryList))
  }

  return(
    <>
    <WorkingOnDiv viewOnly={viewOnly}>
      <h2>Currently Working On:</h2>
      <ContentDiv>
        
          {category.taskWorkingOn ? <TaskName>{`Task -${category.taskWorkingOn.name}- from:`}</TaskName> : ""}
          <CategoryName>{category.name}</CategoryName>
          { category.tasks && category.tasks.length > 0
            ? <TaskList tasks={category.tasks}/>
            : ""
          }

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
