import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { createNewTask } from '../reducer/categoryReducer'
import utils from './utils';


const TaskForm = ({category, showTasks, toggleCreatingTask}) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const nameInput = useRef();
  const taskFormRef = useRef();

  const focusOnName = () => {
    setTimeout(() => {
      nameInput.current.focus();
    }, 100);
  }

  focusOnName();
  
  useEffect(() => {
    showTasks();
  }, [showTasks])

  utils.useOutsideEventListener(taskFormRef, toggleCreatingTask);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (name) {
      const index = category.tasks.length;
      dispatch(createNewTask({name, content, category: category.id, index}));
      setName('');
      setContent('');
    }
  }

  return(
    <div ref={taskFormRef}>
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