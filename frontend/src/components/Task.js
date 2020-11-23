import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { removeTask } from '../reducer/categoryReducer';
import { patchAccomplishedTask } from '../reducer/categoryReducer';
import OptionBox from './OptionBox';

const TaskNameSpan = styled.span`
  text-decoration-line: ${props => (props.isAccomplished ? 'line-through' : 'none')}
`

const Task = ({ task, category, taskArrayIndex, makeTaskWorkingOn, categoryArrayIndex}) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteTask = () => {
    if (window.confirm(`Delete ${task.name}?`)) {
      dispatch(removeTask(task.id, category));
    }
  }

  return(
    <Draggable draggableId={task.id} index={taskArrayIndex}>
      {provided => (
        <div
        ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div style={{"display": "flex", "alignItems": "center"}}>
            <OptionBox optionsArray={
              [
                ['Toggle Done', () => dispatch(patchAccomplishedTask(task.id, !task.accomplished))],
                ['Delete', handleDeleteTask]
              ]
            }/>
            <TaskNameSpan 
              isAccomplished={task.accomplished}
              onDoubleClick={() => {
                if (task.accomplished) return alert('Cannot work on accomplished task');
                makeTaskWorkingOn(category, task, categoryArrayIndex) 
              }}
              {...provided.dragHandleProps}
            >
              {task.name}
            </TaskNameSpan>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default Task;