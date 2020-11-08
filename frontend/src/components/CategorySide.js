import React from 'react';
import styled from "styled-components";
import { Draggable } from 'react-beautiful-dnd';

import DroppableTaskList from './DroppableTaskList'
import OptionBox from './OptionBox'

const CategoryName = styled.span`
  font-size: 1.07em;
  font-weight: bold;
  text-decoration-line: ${props => (props.isAccomplished ? 'line-through;' : 'none;')}
`

const DropDown = styled.div`
  margin-bottom: 1.5rem;
`

const CategorySide = ({category, deleteCategory, makeWorkingOn, arrayIndex, makeTaskWorkingOn, toggleAccomplishedCategory}) => {
  return (
    <Draggable draggableId={category.id} index={arrayIndex}>
      {provided => (
        <DropDown
          ref={provided.innerRef}
          // isDragging={snapshot.isDragging}
          {...provided.draggableProps}
        >
          <div style={{"display": "flex"}}>
            <OptionBox optionsArray={[
                ['Mark Done', () => toggleAccomplishedCategory(category.id, !category.accomplished)],
                ['Edit'],
                ['Send to'],
                ['Delete']
              ]}
            />
            <div>
              <span {...provided.dragHandleProps}>
                <CategoryName onDoubleClick={() => makeWorkingOn(arrayIndex)}>{category.name}</CategoryName>
              </span>
              <DroppableTaskList 
                category={category}
                deleteCategory={deleteCategory}
                makeTaskWorkingOn={makeTaskWorkingOn}
                categoryArrayIndex={arrayIndex}
              />
            </div>
          </div>
        </DropDown>
      )}
    </Draggable>
  )
}

export default CategorySide;