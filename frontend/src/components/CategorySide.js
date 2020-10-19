import React, { useRef } from 'react';
import styled from "styled-components";

import TaskForm from './TaskForm'
import Toggable from './Toggable'

const TaskDiv = styled.div`
  margin-left: 1.5rem;
`

const DropDown = styled.div`
  margin-bottom: 1.5rem;
`

const CategorySide = ({category, deleteCategory}) => {
  const toggleTask = useRef();

  return (
    <DropDown>
      <h3>
        {category.name}----
        <button onClick={() => {deleteCategory(category)}}>X</button>
        ----
        <button onClick={() => {toggleTask.current.toggleVisibility()}}>&or;</button>
      </h3>
      <Toggable ref={toggleTask}>
            <TaskDiv className="tasks">
              {category.tasks.map(task => <p key={task.id}>&gt; {task.name}</p>)}
            </TaskDiv>
            <TaskForm category={category}/>
      </Toggable>
    </DropDown>
  )
}

export default CategorySide;