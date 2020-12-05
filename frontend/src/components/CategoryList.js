import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { initializeCategories,
    removeCategory,
    switchCategoryIndexes,
    switchTaskIndexes, 
    switchTaskWorkingOn,
    patchAccomplishedCategory
  } from '../reducer/categoryReducer'
import CategoryForm from './CategoryForm'
import CategorySide from './CategorySide'
import WorkingOn from './WorkingOn';

const StyledDroppable = styled.div`
  margin-right: 1rem;
  padding-bottom: .5rem;
  border-bottom: .15rem solid;
`

const CategoryFormDiv = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const CategoryList = () => {
  const dispatch = useDispatch()
  const categoryList = useSelector(state => state.categories)
  const username = useSelector(state => state.token.username);

  useEffect(() => {
    dispatch(initializeCategories())
  }, [dispatch])

  const toggleAccomplishedCategory = (categoryId, accomplishedStatus) => {
    dispatch(patchAccomplishedCategory(categoryId, categoryList, accomplishedStatus));
  }

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
      dispatch(switchCategoryIndexes(sourceIdx, destIdx, categoryList, username));
    } else {
      const categoryId = result.source.droppableId;
      dispatch(switchTaskIndexes(sourceIdx, destIdx, categoryList, categoryId))
    }
  }

  const makeWorkingOn = (index) => {
    dispatch(switchCategoryIndexes(index, 0, categoryList, username));
  }

  const makeTaskWorkingOn = (category, task, categoryArrayPosition) => {
    dispatch(switchTaskWorkingOn(category, task, categoryList, categoryArrayPosition, username));
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={'categories'} type={'categories'}>
          {provided => (
            <StyledDroppable
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {categoryList.map((category, position) => {
                if (category === null || category === categoryList[0]) {
                  return (
                  <div key={category.id}>
                    <WorkingOn category={category} categoryList={categoryList}/>
                    <CategoryFormDiv><CategoryForm /></CategoryFormDiv>
                    <h2>Your Projects:</h2>
                  </div>
                  )
                }
                return (
                  <CategorySide
                    key={category.id}
                    className="category"
                    category={category}
                    deleteCategory={deleteCategory}
                    makeWorkingOn={makeWorkingOn}
                    arrayIndex={position}
                    makeTaskWorkingOn={makeTaskWorkingOn}
                    toggleAccomplishedCategory={toggleAccomplishedCategory}
                    categoryList={categoryList}
                    />
                )
              })}
              {provided.placeholder}
            </StyledDroppable>
          )}
        </Droppable>
      </DragDropContext>
      {/* <StyledDroppable>
        <GivenCategoriesTasks />
      </StyledDroppable> */}
    </div>
  )
}

export default CategoryList