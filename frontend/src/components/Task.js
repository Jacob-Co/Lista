import React from 'react';
import { useDispatch } from 'react-redux';

import { removeTask } from '../reducer/categoryReducer';

const Task = ({ task, category }) => {
  const dispatch = useDispatch();

  return(
    <div>
      &gt; {task.name}
      --<button onClick={() => dispatch(removeTask(task.id, category.id))}>X</button>
    </div>
  )
}

export default Task;