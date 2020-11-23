import React, { useImperativeHandle, useRef } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import Toggable from './Toggable';
import Task from './Task';


const TaskDiv = styled.div`
  margin-left: 1.5rem;
  margin-bottom: 1rem;
`

const DroppableTaskList = React.forwardRef(({category, makeTaskWorkingOn, categoryArrayIndex, children}, ref) => {
  const taskToggable = useRef();
  const createTaskToggable = useRef();

  const showTasks = () => {
    taskToggable.current.toggleVisibility(true);
  }

  const toggleTasks = () => {
    if (taskToggable.current.visible) createTaskToggable.current.toggleVisibility(false);
    taskToggable.current.toggleVisibility();
  }

  useImperativeHandle(ref, () => {
    return {
    }
  })

  return (
    <>
      {category.tasks.length > 0 ? <button onClick={toggleTasks}>&or;</button> : ''}
      {children}
      <div>
        <Droppable droppableId={`${category.id}`} type="tasks">
          {provided => (
            <div 
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <Toggable ref={taskToggable}>
              { category.tasks.length > 0 
                ? <TaskDiv className="tasks">
                    <h4>Tasks:</h4>
                    {category.tasks.map((task, position) => <div
                      key={task.id}
                    >
                        <Task
                        task={task}
                        category={category}
                        categoryArrayIndex={categoryArrayIndex}
                        taskArrayIndex={position}
                        makeTaskWorkingOn={makeTaskWorkingOn}
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
})

export default DroppableTaskList;