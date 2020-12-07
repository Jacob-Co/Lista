import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

import OptionBox from './OptionBox';
import UniversalEditForm from './UniversalEditForm';
import SendForm from './SendForm';
//reducers
import { removeTask, patchTaskAccomplished, patchTaskName, patchTaskSentTo } from '../reducer/categoryReducer';

const SendToDiv = styled.div`
  margin-left: 1rem;
  font-size: 1.02em;
  font-style: italic;
`

const TaskNameSpan = styled.span`
  text-decoration-line: ${props => (props.isAccomplished ? 'line-through' : 'none')}
`

const ColumnarDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const TaskDiv = styled.div`
  margin-bottom: .87rem;
`

const RowDiv = styled.div`
  display: flex;
  align-items: baseline;
`

const Task = ({ task, category, taskArrayIndex, makeTaskWorkingOn, categoryArrayIndex}) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const myToken = useSelector(state => state.token);
  const myUsername = myToken.username;
  const myId = myToken.id;

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

  const handleUnsendTask = () => {
    dispatch(patchTaskSentTo(task.id, null));
  }

  const optionsToBePassed = (isAccomplished, isSentToMe, isSentToFriend) => {
    const toggleDone = ['Toggle Done', () => dispatch(patchTaskAccomplished(task.id, !task.accomplished))];
    const edit = ['Edit', toggleEditing];
    const deleteTask = ['Delete', handleDeleteTask];
    const sendTask = ['Send to', toggleSending];
    const unsendTask = ['Unsend', handleUnsendTask];

    if (isSentToMe) {
      return [toggleDone];
    } else if (isSentToFriend) {
      return [unsendTask];
    } else if (isAccomplished) {
      return [toggleDone]
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
        <TaskDiv
        ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <ColumnarDiv>
            <RowDiv>
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
                      if (isSentToFriend()) {
                        return alert('Cannot work on sent task')
                      } else if (task.accomplished) {
                        return alert('Cannot work on accomplished task')
                      }
                      makeTaskWorkingOn(category, task, categoryArrayIndex);
                    }}
                  >
                    {category.sentTo ? <>{task.name}</> : <span {...provided.dragHandleProps}>{task.name}</span>}
                  </TaskNameSpan>
              }
            </RowDiv>
            {task.sentTo
              ? <SendToDiv>
                  <Link to={`/friend/categories/${task.sentTo}`}>
                    {`sent to: ${task.sentToUsername}`}
                  </Link>
                </SendToDiv> 
              : ""
            }
          </ColumnarDiv>
          { isSending
              ? <SendForm
                  toggleSending={() => setTimeout(toggleSending, 1)}
                  item={task}
                  actionReducer={patchTaskSentTo}
                />
              : <div></div>
            }
        </TaskDiv>
      )}
    </Draggable>
  )
}

export default Task;