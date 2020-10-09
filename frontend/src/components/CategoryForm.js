import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createNewCategory } from '../reducer/categoryReducer'

const CategoryForm = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [summary, setSummary] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && summary) {
      dispatch(createNewCategory({name, summary}))
      setName('')
      setSummary('')
    }
  }

  return (
    <div>
      <h3 onClick={() => alert('clicked')}>Click to Add New Category</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input
            type="text"
            name="Name"
            id="name"
            value={name}
            onChange={({target}) => setName(target.value)}
          />
        </div>
        
        <div>
          summary:
          <input
            type="text"
            name="Summary"
            id="summary"
            value={summary}
            onChange={({target}) => setSummary(target.value)}
          />
        </div>
        <button>send</button>
      </form>
    </div>
  )
}

export default CategoryForm;