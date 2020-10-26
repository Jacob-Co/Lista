import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const WorkingOn = ({ category }) => {
  return(
    <Draggable draggableId={category.id} index={category.index}>
      {provided => 
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {category.name}
        </div>
      }
    </Draggable>
  );
};

export default WorkingOn;
