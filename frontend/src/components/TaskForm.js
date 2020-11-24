import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { createNewTask } from '../reducer/categoryReducer'
import utils from './utils';

const TaskForm = ({category, showTasks}) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const nameInput = useRef();

  const focusOnName = () => {
    setTimeout(() => {
      nameInput.current.focus();
    }, 100);
  }

  const displayTaskForm = () => {
    showTasks();
    // toggableRef.current.toggleVisibility(true);
    focusOnName();
  }

  const hideTaskForm = () => {
    // toggableRef.current.toggleVisibility(false);
  };

  // utils.useOutsideEventListener(taskFormRef, hideTaskForm);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (name) {
      const index = category.tasks.length;
      dispatch(createNewTask({name, content, category: category.id, index}));
      setName('');
      setContent('');
      showTasks();
    }
  }

  return(
    <div>
        <h3>Creating a new task</h3>
        <form onSubmit={handleFormSubmit}>
          <div>
            name
            <input
              ref={nameInput}
              type="text"
              id="name"
              name="Name"
              value={name}
              onChange={({target}) => setName(target.value)}
            />
          </div>
          <button>create</button>
        </form>
    </div>
  )
}

export default TaskForm