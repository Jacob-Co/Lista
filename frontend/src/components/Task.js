import React from 'react';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

import { removeTask } from '../reducer/categoryReducer';

const Task = ({ task, category }) => {
  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    if (window.confirm(`Delete ${task.name}?`)) {
      dispatch(removeTask(task.id, category));
    }
  }

  return(
    <Draggable draggableId={task.id} index={task.index}>
      {provided => (
        <div
        ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          &gt; {task.name}
          --<button onClick={handleDeleteTask}>X</button>
        </div>
      )}
    </Draggable>
  )
}

export default Task;