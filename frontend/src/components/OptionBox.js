import React, { useRef } from 'react';
import styled from 'styled-components';

import Toggable from './Toggable';

const CheckBox = styled.span`
  font-size: 1.2em;
`
const OptionBoxContent = styled.div`

`

const OptionBox = ({ optionsArray = [], checked }) => {
  const optionBoxRef = useRef();

  return(
    <div>
      <div onClick={() => optionBoxRef.current.toggleVisibility()}>
        { checked ? <CheckBox>&#9745;</CheckBox> : <CheckBox>&#9744;</CheckBox>}
      </div>
      <Toggable ref={optionBoxRef}>
        <OptionBoxContent>
          {optionsArray.map((option, idx) => <div key={idx}>
            {option[0]}
          </div>)}
        </OptionBoxContent>
      </Toggable>
    </div>
  )
}

export default OptionBox;