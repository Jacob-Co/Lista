import React, { useRef } from 'react';
import styled from 'styled-components'
import Task from './Task';

import Toggable from './Toggable';

const TaskDiv = styled.div`
  margin-left: 1.5rem;
`

const FriendTasksView = ({task}) => {
  const taskToggableRef = useRef();

  return(
    <TaskDiv>
      <button onClick={() => taskToggableRef.current.toggleVisibiliy()}>&or;</button>
      <Toggable ref={taskToggableRef}>
        {task.name}
      </Toggable>
    </TaskDiv>
  )
}

export default FriendTasksView;