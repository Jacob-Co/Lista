import React from 'react';
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
          style={{"display": "flex", "alignItems": "center"}}
        >
          <OptionBox optionsArray={
            [
              ['Toggle Done', () => dispatch(patchAccomplishedTask(task.id, !task.accomplished))],
              ['Delete', handleDeleteTask]
            ]
          }/>
          <span {...provided.dragHandleProps}
            onDoubleClick={() => {
              if (task.accomplished) return alert('Cannot work on accomplished task');
              makeTaskWorkingOn(category, task, categoryArrayIndex) 
            }}
          >
            <TaskNameSpan isAccomplished={task.accomplished}>{task.name}</TaskNameSpan>
          </span>
        </div>
      )}
    </Draggable>
  )
}

export default Task;