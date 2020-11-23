import React, { useState, useRef, useImperativeHandle } from 'react'
import { useDispatch } from 'react-redux'

import Toggable from './Toggable'
import { createNewTask } from '../reducer/categoryReducer'
import utils from './utils';

const TaskForm = React.forwardRef(({category, showTasks}, ref) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const nameInput = useRef();
  const taskFormRef = useRef();
  const toggableRef = useRef();

  const focusOnName = () => {
    setTimeout(() => {
      nameInput.current.focus();
    }, 100);
  }

  const displayTaskForm = () => {
    toggableRef.current.toggleVisibility(true);
    focusOnName();
  }

  const hideTaskForm = () => {
    toggableRef.current.toggleVisibility(false);
  };

  utils.useOutsideEventListener(taskFormRef, hideTaskForm);

  useImperativeHandle(ref, () => {
    return { displayTaskForm }
  })

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
    <div ref={taskFormRef}>
      <Toggable ref={toggableRef}>
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
      </Toggable>
    </div>
  )
})

export default TaskForm