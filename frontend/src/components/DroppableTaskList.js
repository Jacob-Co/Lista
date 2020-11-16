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

const DroppableTaskList = ({category, deleteCategory, makeTaskWorkingOn, categoryArrayIndex}) => {
  const taskToggable = useRef();
  const createTaskToggable = useRef();
  const taskFormRef = useRef();

  const showTasks = () => {
    taskToggable.current.toggleVisibility(true);
  }

  const toggleTasks = () => {
    if (taskToggable.current.visible) createTaskToggable.current.toggleVisibility(false);
    taskToggable.current.toggleVisibility();
  }

  const showCreateTask = () => {
    createTaskToggable.current.toggleVisibility()
    taskFormRef.current.focusOnName();
  }

  return (
    <>
      {/* <button onClick={() => {deleteCategory(category)}}>X</button> */}
      { category.sentTo ? "" : <button onClick={showCreateTask}>+</button>}
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
                    {category.tasks.map((task, position) => <div onDoubleClick={()=>{
                        makeTaskWorkingOn(category, task, categoryArrayIndex);
                        console.log(`works`)
                      }}
                      key={task.id}
                    >
                        <Task
                        task={task}
                        category={category}
                        arrayIndex={position}
                        />
                      </div>
                    )}
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

export default DroppableTaskList;