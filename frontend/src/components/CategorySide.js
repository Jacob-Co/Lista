import React, { useRef } from 'react';
import styled from "styled-components";
import { Draggable } from 'react-beautiful-dnd';

import TaskForm from './TaskForm'
import Toggable from './Toggable'
import Task from './Task';

const TaskDiv = styled.div`
  margin-left: 1.5rem;
  margin-bottom: 1rem;
`

const DropDown = styled.div`
  margin-bottom: 1.5rem;
`

const CategorySide = ({category, deleteCategory, makeWorkingOn}) => {
  const toggleTask = useRef();
  const toggleCreateTask = useRef();

  const showTasks = () => {
    toggleTask.current.toggleVisibility(true);
  }

  const toggleTasks = () => {
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
            <span onDoubleClick={() => makeWorkingOn(category.index)}>{category.name}</span>
            <button onClick={() => {deleteCategory(category)}}>X</button>
            <button onClick={() => toggleCreateTask.current.toggleVisibility()}>+</button>
            { category.tasks.length > 0 ? <button onClick={toggleTasks}>&or;</button> : ''}
          </h3>
          <Toggable ref={toggleCreateTask}>
            <TaskDiv><TaskForm category={category} showTasks={showTasks}/></TaskDiv>
          </Toggable>
          <Toggable ref={toggleTask}>
          { category.tasks.length > 0 
            ? <TaskDiv className="tasks">
                <h4>Tasks:</h4>
                {category.tasks.map(task => <Task task={task} key={task.id} category={category}/>)}
              </TaskDiv>
            : ''
          }
          </Toggable>
        </DropDown>
      )}
    </Draggable>
  )
}

export default CategorySide;