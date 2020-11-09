import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { patchCategoryName } from '../reducer/categoryReducer';

const CategoryNameEditForm = ({ category, categoryList, toggleEditing }) => {
  const [ name, setName] = useState(category.name);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name) {
      dispatch(patchCategoryName(category.id, categoryList, name));
      toggleEditing();
    }
  }

  return(
    <form onsubmit={ handleSubmit }>
      <input
        value={name}
        onChange={({target}) => setName(target.value)}
      />
      <button>edit</button>
    </form>
  )
}

export default CategoryNameEditForm;