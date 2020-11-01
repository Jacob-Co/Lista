import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { switchIndexes } from '../reducer/categoryReducer';

const WorkingOnDiv = styled.div`
  padding-bottom: .5rem;
  border-bottom: .15rem solid;
`

const WorkingOn = ({ category, categoryList }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    if (!category.workingOn && category.extraInfo !== null) return;
    dispatch(switchIndexes(0, 0, categoryList))
  }

  return(
    <>
    <WorkingOnDiv>
      <h2>Currently Working On:</h2>
      <h3>{category.name}</h3>
      { category.extraInfo === null ? <button onClick={handleRemove}>remove</button> : ''}
    </WorkingOnDiv>
    <h2>Other Categories:</h2>
    </>
      );
};

export default WorkingOn;
