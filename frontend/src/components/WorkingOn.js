import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const WorkingOnDiv = styled.div`
  margin-right: 1rem;
  padding-bottom: .5rem;
  border-bottom: .15rem solid;
`

const WorkingOn = ({ category }) => {
  return(
    <WorkingOnDiv>
      <h2>Category currently working on:</h2>
      <Draggable draggableId={category.id} index={category.index}>
        {provided => {
          return category.extraInfo === 'placeHolder'
            ? <div
                ref={provided.innerRef}
                // no draggable props
                {...provided.dragHandleProps}
              >
                <h3>{category.name}</h3>
              </div>
            : <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <h3>{category.name}</h3>
              </div>
          }
        }
      </Draggable>
  </WorkingOnDiv>
  );
};

export default WorkingOn;
