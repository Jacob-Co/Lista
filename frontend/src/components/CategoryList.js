import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { initializeCategories, removeCategory, switchIndexes } from '../reducer/categoryReducer'
import CategoryForm from './CategoryForm'
import CategorySide from './CategorySide'
import WorkingOn from './WorkingOn';

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
      dispatch(removeCategory(id, categoryList))
    }
  }

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    const sourceIdx = parseInt(result.source.index)
    const destIdx = parseInt(result.destination.index)
    console.log(`source: ${sourceIdx}, dest: ${destIdx}`)
    if (result.type === 'categories') {
      dispatch(switchIndexes(sourceIdx, destIdx, categoryList));
    } else {
      //switchTaskIndex
    }
  }

  const makeWorkingOn = (index) => {
    dispatch(switchIndexes(index, 0, categoryList));
  }

  return (
    <div>
      <h2>Your Categories:</h2>
      <CategoryForm />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={'categories'} type={'categories'}>
          {provided => (
            <StyledDroppable
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {categoryList.map(category => {
                if (category === null || category === categoryList[0]) {
                  return <WorkingOn key={category.id} category={category} categoryList={categoryList}/>
                }
                return <CategorySide 
                  className="category"
                  key={category.id}
                  category={category}
                  deleteCategory={deleteCategory}
                  makeWorkingOn={makeWorkingOn}
                />
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