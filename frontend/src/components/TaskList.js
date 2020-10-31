import React, { useRef } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import TaskForm from './TaskForm';
import Toggable from './Toggable';
import Task from './Task';


const TaskDiv = styled.div`
  margin-left: 1.5rem;
  margin-bottom: 1rem;
`

const TaskList = ({category, deleteCategory}) => {
  const toggleTask = useRef();
  const toggleCreateTask = useRef();

  const showTasks = () => {
    toggleTask.current.toggleVisibility(true);
  }

  const toggleTasks = () => {
    toggleTask.current.toggleVisibility();
  }

  return (
    <>
      <button onClick={() => {deleteCategory(category)}}>X</button>
      <button onClick={() => toggleCreateTask.current.toggleVisibility()}>+</button>
      {category.tasks.length > 0 ? <button onClick={toggleTasks}>&or;</button> : ''}
      <div>
        <Droppable droppableId={'tasks'}>
          {provided => (
            <div 
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
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
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  )
}

export default TaskList;