import React, { useRef } from 'react';

import Toggable from './Toggable';


const OptionBox = ({ optionsArray, checked }) => {
  const optionBoxRef = useRef();

  return(
    <>
      { checked ? <>&#9745;</> : <>&#9744;</>}
      <Toggable ref={optionBoxRef}>
      </Toggable>
    </>
  )
}

export default OptionBox;