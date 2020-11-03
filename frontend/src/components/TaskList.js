import React, { useRef } from 'react';
import styled from 'styled-components'

import Toggable from './Toggable';

const TasksDiv = styled.div`
  margin-left: 1.5rem;
`

const FriendTasksView = ({tasks}) => {
  const taskToggableRef = useRef();

  return(
    <>
      <button onClick={() => taskToggableRef.current.toggleVisibility()}>&or;</button>
      <TasksDiv>
        <Toggable ref={taskToggableRef}>
          <h4>Tasks:</h4>
          {tasks.map(task => <div key={task.id}>&gt; {task.name}</div>)}
        </Toggable>
      </TasksDiv>
    </>
  )
}

export default FriendTasksView;