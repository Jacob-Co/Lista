import React, { useRef } from 'react';
import styled from 'styled-components'
import Task from './Task';

import Toggable from './Toggable';

const TasksDiv = styled.div`
  margin-left: 1.5rem;
`
const TasksHeader = styled.span`
  font-size: 1.05em;
  font-weight: bold;
`

const FriendTasksView = ({tasks}) => {
  const taskToggableRef = useRef();

  return(
    <>
      <button onClick={() => taskToggableRef.current.toggleVisibility()}>&or;</button>
      <TasksDiv>
        <Toggable ref={taskToggableRef}>
          <TasksHeader>Tasks:</TasksHeader>
          {tasks.map(task => <div key={task.id}>{task.name}</div>)}
        </Toggable>
      </TasksDiv>
    </>
  )
}

export default FriendTasksView;