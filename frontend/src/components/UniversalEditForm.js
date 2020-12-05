import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import utils from './utils';

const CategoryNameEditForm = ({ orignalValue, toggleEditing, newValueReducer }) => {
  const [ name, setName] = useState(orignalValue);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const formRef = useRef();

  utils.useOutsideEventListener(formRef, toggleEditing);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name) {
      dispatch(newValueReducer(name));
      toggleEditing();
    }
  }

  return(
    <form onSubmit={ handleSubmit } ref={formRef}>
      <input
        ref={inputRef}
        value={name}
        onChange={({target}) => setName(target.value)}
      />
      <button>save</button>
    </form>
  )
}

export default CategoryNameEditForm;