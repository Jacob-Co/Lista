import React from 'react';
import styled from "styled-components";
import { Draggable } from 'react-beautiful-dnd';

import TaskList from './DroppableTaskList'

const CategoryName = styled.span`
  font-size: 1.07em;
  font-weight: bold;
`

const DropDown = styled.div`
  margin-bottom: 1.5rem;
`

const CategorySide = ({category, deleteCategory, makeWorkingOn, arrayIndex}) => {
  return (
    <Draggable draggableId={category.id} index={arrayIndex}>
      {provided => (
        <DropDown
          ref={provided.innerRef}
          // isDragging={snapshot.isDragging}
          {...provided.draggableProps}
        >
          <div>
            <span {...provided.dragHandleProps}>
              <CategoryName onDoubleClick={() => makeWorkingOn(arrayIndex)}>{category.name}</CategoryName>
            </span>
            <TaskList category={category} deleteCategory={deleteCategory}/>
          </div>
        </DropDown>
      )}
    </Draggable>
  )
}

export default CategorySide;