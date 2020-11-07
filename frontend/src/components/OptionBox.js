import React, { useRef } from 'react';
import styled from 'styled-components';

import Toggable from './Toggable';

const CheckBox = styled.span`
  font-size: 1.2em;
`
const OptionBoxContent = styled.div`
  position: absolute;
  left: 1em;
  padding: .35em;
  background-color: black;
  color: white;
  width: 7.5rem;
`

const OptionDiv = styled.div`
  margin: .35em 0;
`

const OptionBox = ({ optionsArray = [], checked }) => {
  const optionBoxRef = useRef();

  return(
    <div style={{"position": "relative"}}>
      <div onClick={() => optionBoxRef.current.toggleVisibility()}>
        { checked ? <CheckBox>&#9745;</CheckBox> : <CheckBox>&#9744;</CheckBox>}
      </div>
      <Toggable ref={optionBoxRef}>
        <OptionBoxContent>
          {optionsArray.map((option, idx) => <OptionDiv key={idx}>
            &#x000B7; {option[0]}
          </OptionDiv>)}
        </OptionBoxContent>
      </Toggable>
    </div>
  )
}

export default OptionBox;