import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { initializeCategories, removeCategory, switchIndexes } from '../reducer/categoryReducer'
import CategoryForm from './CategoryForm'
import CategorySide from './CategorySide'

const StyledDroppable = styled.div`
  margin-right: 1rem;
  padding-bottom: .5rem;
  border-bottom: .15rem solid;
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

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    let sourceIdx = parseInt(result.source.index)
    let destIdx = parseInt(result.destination.index)
    console.log(`source: ${sourceIdx}, dest: ${destIdx}`)
    dispatch(switchIndexes(categoryList[sourceIdx], categoryList[destIdx], categoryList));
  }

  return (
    <div>
      <h2>Categories:</h2>
      <CategoryForm />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={'1'}>
          {provided => (
            <StyledDroppable
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {categoryList.map(category => {
                if (category === null || category.index === 0) {
                  return (<h1 key={0}>Currently Working On:</h1>)
                }
                return <CategorySide className="category" key={category.id} category={category} deleteCategory={deleteCategory} />
              })}
              {provided.placeholder}
            </StyledDroppable>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default CategoryList