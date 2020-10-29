import React from 'react';
import { useDispatch } from 'react-redux';

import { removeTask } from '../reducer/categoryReducer';

const Task = ({ task, category }) => {
  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    if (window.confirm(`Delete ${task.name}?`)) {
      dispatch(removeTask(task.id, category));
    }
  }

  return(
    <div>
      &gt; {task.name}
      --<button onClick={handleDeleteTask}>X</button>
    </div>
  )
}

export default Task;