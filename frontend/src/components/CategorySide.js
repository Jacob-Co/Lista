import React, { useState, useRef } from 'react';
import styled from "styled-components";
import { Draggable } from 'react-beautiful-dnd';

import DroppableTaskList from './DroppableTaskList';
import OptionBox from './OptionBox';
import CategoryNameEditForm from './CategoryNameEditForm';
import Toggable from './Toggable';
import SendForm from './SendForm';

const CategoryName = styled.span`
  font-size: 1.07em;
  font-weight: bold;
  text-decoration-line: ${props => (props.isAccomplished ? 'line-through;' : 'none;')}
`

const DropDown = styled.div`
  margin-bottom: 1.5rem;
`

const ContentDiv = styled.div`
  margin-left: 1.5rem;
`

const SendFormWrapper = styled.div`
  margin-left: 3rem;
`

const SendToDiv = styled.div`
  margin-left: 3rem;
  font-size: 1.02em;
  font-style: italic;
`

const CategorySide = ({
      category,
      deleteCategory,
      makeWorkingOn,
      arrayIndex,
      makeTaskWorkingOn,
      toggleAccomplishedCategory,
      categoryList,
    }) => {

  const [isEditing, setIsEditing] = useState(false);
  const sendFormRef = useRef();

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  }

  const optionsToBePassed = (isAccomplished, isSent) => {
    const toggleDone = ['Toggle Done', () => toggleAccomplishedCategory(category.id, !category.accomplished)];
    const edit = ['Edit', () => toggleEditing()];
    const sendTo = ['Send to', () => sendFormRef.current.toggleVisibility(true)];
    const deleteFunction = ['Delete', () => deleteCategory(category)];

    if (isAccomplished && isSent) {
      return [deleteFunction]
    } else if (isAccomplished) {
      return [toggleDone, deleteFunction]
    }

    return [toggleDone, edit, sendTo, deleteFunction];
  }

  return (
    <Draggable draggableId={category.id} index={arrayIndex}>
      {provided => (
        <DropDown
          ref={provided.innerRef}
          // isDragging={snapshot.isDragging}
          {...provided.draggableProps}
        >
          <ContentDiv style={{"display": "flex"}}>
            <OptionBox optionsArray={optionsToBePassed(category.accomplished, category.sentTo)}
              checked={ category.accomplished }
            />
            { isEditing 
              ? <CategoryNameEditForm
                  category={category}
                  categoryList={categoryList}
                  toggleEditing={toggleEditing}
                />
              : <div>
                <span {...provided.dragHandleProps}>
                  <CategoryName 
                    onDoubleClick={() => makeWorkingOn(arrayIndex)}
                    isAccomplished={category.accomplished}
                  >
                    {category.name}
                  </CategoryName>
                </span>
                <DroppableTaskList 
                  category={category}
                  deleteCategory={deleteCategory}
                  makeTaskWorkingOn={makeTaskWorkingOn}
                  categoryArrayIndex={arrayIndex}
                />
              </div>
            }
          </ContentDiv>
          {category.sentTo ? <SendToDiv>{`sent to: ${category.sentTo.username}`}</SendToDiv> : ""}
          <Toggable ref={sendFormRef}>
            <SendFormWrapper>
              <SendForm 
                hideSendForm={() => sendFormRef.current.toggleVisibility(false)}
                item={category}
              />
            </SendFormWrapper>
          </Toggable>
        </DropDown>
      )}
    </Draggable>
  )
}

export default CategorySide;