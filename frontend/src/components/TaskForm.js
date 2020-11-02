import React, { useState, useRef, useImperativeHandle } from 'react'
import { useDispatch } from 'react-redux'

import { createNewTask } from '../reducer/categoryReducer'

const TaskForm = React.forwardRef(({category, showTasks}, ref) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const nameInput = useRef()

  const focusOnName = () => {
    setTimeout(() => {
      nameInput.current.focus();
    }, 100);
  }

  useImperativeHandle(ref, () => {
    return { focusOnName }
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

        {/* <div>
          content
          <input
            type="text"
            id="content"
            name="Content"
            value={content}
            onChange={({target}) => setContent(target.value)}
          />
        </div> */}
        <button>create</button>
      </form>
    </div>
  )
})

export default TaskForm