import React, { useRef } from 'react';

import Toggable from './Toggable';


const OptionBox = ({ optionsArray, checked }) => {
  const optionBoxRef = useRef();

  return(
    <Toggable ref={optionBoxRef}>
      { checked ? <>&#9745;</> : <>&#9744;</>}
    </Toggable>
  )
}

export default OptionBox;