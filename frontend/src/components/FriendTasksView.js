import React, { useRef } from 'react';
import styled from 'styled-components'
import Task from './Task';

import Toggable from './Toggable';

const TaskDiv = styled.div`
  margin-left: 1.5rem;
`

const FriendTasksView = ({tasks}) => {
  const taskToggableRef = useRef();

  return(
    <TaskDiv>
      <button onClick={() => taskToggableRef.current.toggleVisibiliy()}>&or;</button>
      <Toggable ref={taskToggableRef}>
        {tasks.map(task => <p key={task.id}>{task.name}</p>)}
      </Toggable>
    </TaskDiv>
  )
}

export default FriendTasksView;