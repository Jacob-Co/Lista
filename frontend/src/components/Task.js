import React from 'react';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { removeTask } from '../reducer/categoryReducer';
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
            [['Delete', handleDeleteTask]]
          }/>
          <span {...provided.dragHandleProps}
            onDoubleClick={() => makeTaskWorkingOn(category, task, categoryArrayIndex)}
          >
            <TaskNameSpan isAccomplished={task.accomplished}>{task.name}</TaskNameSpan>
          </span>
        </div>
      )}
    </Draggable>
  )
}

export default Task;