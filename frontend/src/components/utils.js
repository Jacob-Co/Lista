import { useEffect } from 'react';

const useOutsideEventListener = (ref, callback) => {
  useEffect(() => {
    const hideForm = (event) => {
      if (ref.current && !ref.current.contains(event.target)) callback();
    }

    document.addEventListener('click', hideForm);
    return () => {
      document.removeEventListener('click', hideForm);
    }
  }, [ref])
}

export default { useOutsideEventListener };
