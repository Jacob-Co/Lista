import React, { useRef } from 'react';
import styled from "styled-components";
import { Draggable } from 'react-beautiful-dnd';

import TaskList from './TaskList'

const DropDown = styled.div`
  margin-bottom: 1.5rem;
`

const CategorySide = ({category, deleteCategory, makeWorkingOn}) => {
  return (
    <Draggable draggableId={category.id} index={category.index}>
      {provided => (
        <DropDown
          ref={provided.innerRef}
          // isDragging={snapshot.isDragging}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div>
            <span onDoubleClick={() => makeWorkingOn(category.index)}>{category.name}</span>
            <TaskList category={category} deleteCategory={deleteCategory}/>
          </div>
        </DropDown>
      )}
    </Draggable>
  )
}

export default CategorySide;