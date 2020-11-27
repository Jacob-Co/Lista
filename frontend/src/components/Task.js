import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import OptionBox from './OptionBox';
import UniversalEditForm from './UniversalEditForm';
import SendForm from './SendForm';
//reducers
import { removeTask, patchTaskAccomplished, patchTaskName, patchTaskSentTo } from '../reducer/categoryReducer';



const TaskNameSpan = styled.span`
  text-decoration-line: ${props => (props.isAccomplished ? 'line-through' : 'none')}
`

const Task = ({ task, category, taskArrayIndex, makeTaskWorkingOn, categoryArrayIndex}) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const myUsername = useSelector(state => state.token.username);

  const handleDeleteTask = () => {
    if (window.confirm(`Delete ${task.name}?`)) {
      dispatch(removeTask(task.id, category));
    }
  }

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  }

  const toggleSending = () => {
    setIsSending(!isSending);
  }

  const newTaskNameReducer = (newName) => {
    return patchTaskName(task.id, newName)
  }

  const optionsToBePassed = (isAccomplished, isSentToMe, isSentToFriend) => {
    const toggleDone = ['Toggle Done', () => dispatch(patchTaskAccomplished(task.id, !task.accomplished))];
    const edit = ['Edit', toggleEditing];
    const deleteTask = ['Delete', handleDeleteTask];
    const sendTask = ['Send to', toggleSending];
    const unsendTask = ['Unsend', dispatch(patchTaskSentTo(task.id, null))];

    if (isAccomplished) {
      return [toggleDone, deleteTask];
    } else if (isSentToMe) {
      return [toggleDone]
    } else if (isSentToFriend) {
      return [unsendTask]
    }

    return [toggleDone, edit, sendTask, deleteTask];
  }

  const isSentToMe = () => {
    if (!category.sentTo) return false;
    if (category.sentTo.username === myUsername) return true;
    return false;
  }

  const isSentToFriend = () => {
    return !!task.representativeCategoryId
  }

  return(
    <Draggable draggableId={task.id} index={taskArrayIndex}>
      {provided => (
        <div
        ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div style={{"display": "flex", "alignItems": "center"}}>
            {(category.sentTo && !isSentToMe()) || category.accomplished
              ? <>&#10132;</>
              : <OptionBox 
                  optionsArray={optionsToBePassed(task.accomplished, isSentToMe(), isSentToFriend())}
                  checked={task.accomplished}
                />
            }
            { isEditing 
              ? <UniversalEditForm
                  orignalValue={task.name}
                  toggleEditing={toggleEditing}
                  newValueReducer={newTaskNameReducer}
                />
              : <TaskNameSpan 
                  isAccomplished={task.accomplished}
                  onDoubleClick={() => {
                    if (task.accomplished) return alert('Cannot work on accomplished task');
                    makeTaskWorkingOn(category, task, categoryArrayIndex) 
                  }}
                  {...provided.dragHandleProps}
                >
                  {task.name}
                </TaskNameSpan>
            }
          </div>
          { isSending
              ? <SendForm
                  toggleSending={toggleSending}
                  item={task}
                  actionReducer={patchTaskSentTo}
                />
              : ''
            }
        </div>
      )}
    </Draggable>
  )
}

export default Task;