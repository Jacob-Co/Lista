import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { initializeCategories } from '../reducer/categoryReducer'

const CategoryList = () => {
  const dispatch = useDispatch()
  const categoryList = useSelector(state => state.categories)

  useEffect(() => {
    dispatch(initializeCategories())
  }, [dispatch])

  return (
    <div>
      <h2>Categories:</h2>
      {categoryList.map(category => {
        return <div className="category" key={category.id}>
          <p>{category.name}</p>
          <div className="tasks">
            {category.tasks.map(task => <p key={task.id}>{task.name}</p>)}
          </div>
        </div>
      })}
    </div>
  )
}

export default CategoryList