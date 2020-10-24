import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { initializeCategories, removeCategory } from '../reducer/categoryReducer'
import CategoryForm from './CategoryForm'
import CategorySide from './CategorySide'


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
      <DragDropContext>
        <Droppable droppableId={'1'}>
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {categoryList.map(category => {
                return <CategorySide className="category" key={category.id} category={category} deleteCategory={deleteCategory} />
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default CategoryList