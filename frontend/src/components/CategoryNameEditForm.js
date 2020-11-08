import React from 'react';

const CategoryNameEditForm = ({ category, categoryList }) => {
  return(
    <form>
      <input
        value={category.name}
      />
      <button>edit</button>
    </form>
  )
}

export default CategoryNameEditForm;