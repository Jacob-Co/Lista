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
    <Draggable draggableId={category.id} index={category.index}>
      {provided => 
        <WorkingOnDiv
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h2>Category currently working on:</h2>
          <h3>{category.name}</h3>
        </WorkingOnDiv>
      }
    </Draggable>
  );
};

export default WorkingOn;
