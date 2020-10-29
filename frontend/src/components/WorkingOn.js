import React from 'react';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { switchIndexes } from '../reducer/categoryReducer';

const WorkingOnDiv = styled.div`
  padding-bottom: .5rem;
  border-bottom: .15rem solid;
`

const WorkingOn = ({ category, categoryList }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    if (!category.workingOn && category.extraInfo !== null) return;
    dispatch(switchIndexes(0, 0, categoryList))
  }

  return(
    <>
    <WorkingOnDiv>
      <h2>Currently Working On:</h2>
      <h3>{category.name}</h3>
      { category.extraInfo === null ? <button onClick={handleRemove}>remove</button> : ''}
        {/* <WorkingOnDiv> */}
          {/* <Draggable draggableId={category.id} index={category.index}>
            {provided => 
              <div
                ref={provided.innerRef}
                // no draggable props
                // style={{ userSelect: 'none' }}
                // {...provided.dragHandleProps}
              >
                <h3>{category.name}</h3>
                <button onClick={handleRemove}>remove</button>
              </div>
            }
          </Draggable>
      </WorkingOnDiv> */}
    </WorkingOnDiv>
    <h2>Other Categories:</h2>
    </>
      );
};

export default WorkingOn;
