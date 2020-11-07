import React, { useRef } from 'react';
import styled from 'styled-components';

import Toggable from './Toggable';

const CheckBox = styled.span`
  font-size: 1.2em;
`

const OptionBox = ({ optionsArray, checked }) => {
  const optionBoxRef = useRef();

  return(
    <>
      { checked ? <CheckBox>&#9745;</CheckBox> : <CheckBox>&#9744;</CheckBox>}
      <Toggable ref={optionBoxRef}>
      </Toggable>
    </>
  )
}

export default OptionBox;