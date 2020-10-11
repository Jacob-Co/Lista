import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from "styled-components";

import { initializeCategories, removeCategory } from '../reducer/categoryReducer'
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

  const deleteCategory = ({name, id}) => {
    if (window.confirm(`Do you really want to delete category ${name}?`)) {
      dispatch(removeCategory(id))
    }
  }

  return (
    <div>
      <h2>Categories:</h2>
      <CategoryForm />
      {categoryList.map(category => {
        return <div className="category" key={category.id}>
          <div>
            {category.name}----
            <button onClick={() => {deleteCategory(category)}}>X</button>
          </div>
          <TaskDiv className="tasks">
            {category.tasks.map(task => <p key={task.id}>> {task.name}</p>)}
          </TaskDiv>
        </div>
      })}
    </div>
  )
}

export default CategoryList