import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createNewCategory } from '../reducer/categoryReducer'

const CategoryForm = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);

  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [summary, setSummary] = useState('');

  const visibility = {display: visible ? '' : 'none'};

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name) {
      const index = categories.pop() 
        ? categories.pop().index + 1
        : 1;
      dispatch(createNewCategory({name, summary, index}))
      setName('')
      setSummary('')
      setVisible(false)
    }
  }

  return (
    <div>
      <button onClick={() => setVisible(!visible)}>
        Click to Add New Category
      </button>
      <form onSubmit={handleSubmit} style={visibility}>
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