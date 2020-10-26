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
      <Draggable draggableId={category.id} index={category.index}>
        {provided => 
          <div
            ref={provided.innerRef}
            // no draggable props
            // style={{ userSelect: 'none' }}
            // {...provided.dragHandleProps}
          >
            <h3>{category.name}</h3>
          </div>
        }
      </Draggable>
  </WorkingOnDiv>
  );
};

export default WorkingOn;
