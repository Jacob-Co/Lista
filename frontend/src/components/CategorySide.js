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
          <h3>
            <span onDoubleClick={() => makeWorkingOn(category.index)}>{category.name}</span>
          </h3>
          <TaskList category={category} deleteCategory={deleteCategory}/>
        </DropDown>
      )}
    </Draggable>
  )
}

export default CategorySide;