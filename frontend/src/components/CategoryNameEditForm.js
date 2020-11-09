import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { patchCategoryName } from '../reducer/categoryReducer';

const CategoryNameEditForm = ({ category, categoryList }) => {
  const [ name, setName] = useState(category.name);

  const handleSubmit = (event) => {
    event.preventDefault();

  }

  return(
    <form onsubmit={ handleSubmit }>
      <input
        value={name}
      />
      <button>edit</button>
    </form>
  )
}

export default CategoryNameEditForm;