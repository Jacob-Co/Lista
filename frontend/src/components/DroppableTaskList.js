import React, { useRef } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import TaskForm from './TaskForm';
import Toggable from './Toggable';
import Task from './Task';


const TaskDiv = styled.div`
  margin-left: 1.5rem;
  margin-bottom: 1rem;
`

const TaskList = ({category, deleteCategory}) => {
  const taskToggable = useRef();
  const createTaskToggable = useRef();
  const taskFormRef = useRef();

  const showTasks = () => {
    taskToggable.current.toggleVisibility(true);
  }

  const toggleTasks = () => {
    taskToggable.current.toggleVisibility();
  }

  const showCreateTask = () => {
    createTaskToggable.current.toggleVisibility()
    taskFormRef.current.focusOnName();
  }

  return (
    <>
      <button onClick={() => {deleteCategory(category)}}>X</button>
      <button onClick={showCreateTask}>+</button>
      {category.tasks.length > 0 ? <button onClick={toggleTasks}>&or;</button> : ''}
      <div>
        <Droppable droppableId={`${category.id}`} type="tasks">
          {provided => (
            <div 
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <Toggable ref={createTaskToggable}>
                <TaskDiv><TaskForm category={category} showTasks={showTasks} ref={taskFormRef}/></TaskDiv>
              </Toggable>
              <Toggable ref={taskToggable}>
              { category.tasks.length > 0 
                ? <TaskDiv className="tasks">
                    <h4>Tasks:</h4>
                    {category.tasks.map((task, position) => <Task
                      task={task}
                      key={task.id}
                      category={category}
                      arrayIndex={position}
                    />)}
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