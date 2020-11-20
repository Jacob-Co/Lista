import React from 'react';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

import { removeTask } from '../reducer/categoryReducer';
import OptionBox from './OptionBox';

const Task = ({ task, category, arrayIndex }) => {
  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    if (window.confirm(`Delete ${task.name}?`)) {
      dispatch(removeTask(task.id, category));
    }
  }

  return(
    <Draggable draggableId={task.id} index={arrayIndex}>
      {provided => (
        <div
        ref={provided.innerRef}
          {...provided.draggableProps}
          style={{"display": "flex", "alignItems": "center"}}
        >
          <OptionBox />
          <span {...provided.dragHandleProps}>{task.name}</span>
          {/* &gt; */}
          {/* --<button onClick={handleDeleteTask}>X</button> */}
        </div>
      )}
    </Draggable>
  )
}

export default Task;