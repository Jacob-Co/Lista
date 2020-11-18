import React, { useRef } from 'react';
import styled from 'styled-components'

import Toggable from './Toggable';
import TaskForm from './TaskForm';

const TasksDiv = styled.div`
  margin-left: 1.5rem;
`

const TaskList = ({tasks, category, children}) => {
  const taskToggableRef = useRef();
  const taskFormToggableRef = useRef();
  const showTaskFormRef = useRef();

  const handleToggleTaskForm = () => {
    taskFormToggableRef.current.toggleVisibility();
    showTaskFormRef.current.focusOnName();
  };

  const showTasks = () => {
    taskToggableRef.current.toggleVisibility(true)
  }

  const toggleTasks = () => {
    if (taskToggableRef.current.visible) taskFormToggableRef.current.toggleVisibility(false);
    taskToggableRef.current.toggleVisibility()
  }

  return(
    <>
      {/* <button onClick={handleToggleTaskForm}>+</button> */}
      <button onClick={toggleTasks}>&or;</button>
      {children}
      <TasksDiv>
        <Toggable ref={taskFormToggableRef}>
          <TaskForm category={category} ref={showTaskFormRef} showTasks={showTasks}/>
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