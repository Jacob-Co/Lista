import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from "styled-components";

import { initializeCategories } from '../reducer/categoryReducer'
import CategoryForm from './CategoryForm'

const TaskDiv = styled.div`
  margin-left: 1.5rem;
`

const CategoryList = () => {
  const dispatch = useDispatch()
  const categoryList = useSelector(state => state.categories)

  useEffect(() => {
    dispatch(initializeCategories())
  }, [dispatch])

  return (
    <div>
      <h2>Categories:</h2>
      <CategoryForm />
      {categoryList.map(category => {
        return <div className="category" key={category.id}>
          <p>{category.name}</p>
          <TaskDiv className="tasks">
            {category.tasks.map(task => <p key={task.id}>> {task.name}</p>)}
          </TaskDiv>
        </div>
      })}
    </div>
  )
}

export default CategoryList