import React, { useRef } from 'react';
import styled from "styled-components";
import { Draggable } from 'react-beautiful-dnd';

import TaskList from './TaskList'

const CategoryName = styled.span`
  font-size: 1.07em;
  font-weight: bold;
`

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
        >
          <div>
            <span {...provided.dragHandleProps}>
              <CategoryName onDoubleClick={() => makeWorkingOn(category.index)}>{category.name}</CategoryName>
            </span>
            <TaskList category={category} deleteCategory={deleteCategory}/>
          </div>
        </DropDown>
      )}
    </Draggable>
  )
}

export default CategorySide;