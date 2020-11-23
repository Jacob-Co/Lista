import { useEffect } from 'react';

const useOutsideEventListener = (ref, callback) => {
  useEffect(() => {
    const hideForm = (event) => {
      if (ref.current && !ref.current.contains(event.target)) callback();
    }

    document.addEventListener('mousedown', hideForm);
    return () => {
      document.removeEventListener('mousedown', hideForm);
    }
  }, [ref])
}

export default { useOutsideEventListener };
