import React, { useRef } from 'react';
import styled from "styled-components";
import { Draggable } from 'react-beautiful-dnd';

import TaskForm from './TaskForm'
import Toggable from './Toggable'

const TaskDiv = styled.div`
  margin-left: 1.5rem;
`

const DropDown = styled.div`
  margin-bottom: 1.5rem;
`

const CategorySide = ({category, deleteCategory, makeWorkingOn}) => {
  const toggleTask = useRef();
  const toggleCreateTask = useRef();

  const showTasks = () => {
    toggleTask.current.toggleVisibility();
  }

  return (
    <Draggable draggableId={category.id} index={category.index}>
      {provided => (
        <DropDown
          ref={provided.innerRef}
          // isDragging={snapshot.isDragging}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h3>
            <span onDoubleClick={() => makeWorkingOn(category.index)}>{category.name}</span>--
            <button onClick={() => {deleteCategory(category)}}>X</button>
            --
            <button onClick={() => toggleCreateTask.current.toggleVisibility()}>+</button>
            --
            <button onClick={showTasks}>&or;</button>
          </h3>
          <Toggable ref={toggleCreateTask}>
            <TaskDiv><TaskForm category={category} showTasks={showTasks}/></TaskDiv>
          </Toggable>
          <Toggable ref={toggleTask}>
                <TaskDiv className="tasks">
                  {category.tasks.map(task => <p key={task.id}>&gt; {task.name}</p>)}
                </TaskDiv>
          </Toggable>
        </DropDown>
      )}
    </Draggable>
  )
}

export default CategorySide;