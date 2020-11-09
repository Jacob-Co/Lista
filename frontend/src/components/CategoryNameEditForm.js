import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { patchCategoryName } from '../reducer/categoryReducer';

const useOutsideEventListener = (ref, callback) => {
  useEffect(() => {
    const hideForm = (event) => {
      console.log(`here`)
      console.log(ref.current)
      if (ref.current && !ref.current.contains(event.target)) callback();
    }

    document.addEventListener('mousedown', hideForm);
    return () => {
      document.removeEventListener('mousedown', hideForm);
    }
  }, [ref])
}

const CategoryNameEditForm = ({ category, categoryList, toggleEditing }) => {
  const [ name, setName] = useState(category.name);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const formRef = useRef();

  useOutsideEventListener(formRef, toggleEditing);

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
    <form onSubmit={ handleSubmit } ref={formRef}>
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