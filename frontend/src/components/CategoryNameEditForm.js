import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { patchCategoryName } from '../reducer/categoryReducer';

const CategoryNameEditForm = ({ category, categoryList, toggleEditing }) => {
  const [ name, setName] = useState(category.name);
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name) {
      dispatch(patchCategoryName(category.id, categoryList, name));
      toggleEditing();
    }
  }

  return(
    <form onSubmit={ handleSubmit }>
      <input
        ref={inputRef}
        value={name}
        onChange={({target}) => setName(target.value)}
      />
      <button>edit</button>
    </form>
  )
}

export default CategoryNameEditForm;