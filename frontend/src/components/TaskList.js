import React, { useRef } from 'react';
import styled from 'styled-components'

import Toggable from './Toggable';

const TasksDiv = styled.div`
  margin-left: 1.5rem;
`

const AccomplishedSpan = styled.span`
  text-decoration-line: ${props => (props.isAccomplished ? 'line-through' : 'none')}
`

const TaskList = ({tasks, children}) => {
  const taskToggableRef = useRef();

  const toggleTasks = () => {
    console.log(`toggleTasks`)
    taskToggableRef.current.toggleVisibility()
  }

  return(
    <>
      <button onClick={toggleTasks}>&or;</button>
      {children}
      <TasksDiv>
        <Toggable ref={taskToggableRef}>
          <h4>Tasks:</h4>
          {tasks.map(task => <div key={task.id}>
              <AccomplishedSpan isAccomplished={task.accomplished}>
                &gt; {task.name}
              </AccomplishedSpan>
            </div>)}
        </Toggable>
      </TasksDiv>
    </>
  )
}

export default TaskList;