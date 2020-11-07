import React, { useRef } from 'react';

import Toggable from './Toggable';


const OptionBox = ({ optionsArray }) => {
  const optionBoxRef = useRef();

  return(
    <Toggable ref={optionBoxRef}>

    </Toggable>
  )
}

export default OptionBox;