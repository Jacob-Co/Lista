import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createNewCategory } from '../reducer/categoryReducer'

const CategoryForm = ({greatestIndex}) => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [summary, setSummary] = useState('');

  const visibility = {display: visible ? '' : 'none'};

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && summary) {
      dispatch(createNewCategory({name, summary, greatestIndex}))
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