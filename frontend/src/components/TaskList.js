import React, { useRef } from 'react';
import styled from 'styled-components'

import Toggable from './Toggable';
import TaskForm from './TaskForm';

const TasksDiv = styled.div`
  margin-left: 1.5rem;
`

const TaskList = ({tasks, category}) => {
  const taskToggableRef = useRef();
  const taskFormToggableRef = useRef();
  // const showTaskFormRef = useRe

  const handleToggleTaskForm = () => {
    taskFormToggableRef.current.toggleVisibility();
  };

  return(
    <>
      <button onClick={handleToggleTaskForm}>+</button>
      <button onClick={() => taskToggableRef.current.toggleVisibility()}>&or;</button>
      <TasksDiv>
        <Toggable ref={taskFormToggableRef}>
          <TaskForm category={category} />
        </Toggable>
        <Toggable ref={taskToggableRef}>
          <h4>Tasks:</h4>
          {tasks.map(task => <div key={task.id}>&gt; {task.name}</div>)}
        </Toggable>
      </TasksDiv>
    </>
  )
}

export default TaskList;