import React, { useRef } from 'react';
import styled from 'styled-components';

import Toggable from './Toggable';
import utils from './utils';

const CheckBox = styled.span`
  font-size: 1.2em;
  cursor: pointer;
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
  margin: .45em 0;
  cursor: pointer
`

const emptyBox = () => {
  return <>&#9744;</>
}

const checkedBox = () => {
  return <>&#9745;</>
}

const OptionBox = ({ optionsArray = [], checked, icon = emptyBox(), accomplishedIcon = checkedBox()}) => {
  const optionBoxRef = useRef();
  const wholeCompRef = useRef();

  const hideOptionBox = () => {
    optionBoxRef.current.toggleVisibility(false);
  }

  const showOptionBox = () => {
    optionBoxRef.current.toggleVisibility()
  }

  utils.useOutsideEventListener(wholeCompRef, hideOptionBox);

  return(
    <div style={{"position": "relative"}} ref={wholeCompRef}>
      <div onClick={showOptionBox}>
        { checked ? <CheckBox>{accomplishedIcon}</CheckBox> : <CheckBox>{icon}</CheckBox>}
      </div>
      <Toggable ref={optionBoxRef}>
        <OptionBoxContent>
          {optionsArray.map((option, idx) => <OptionDiv key={idx}
              onClick={() => {
                option[1]();
                hideOptionBox();
              }}
            >
            &#x000B7; {option[0]}
          </OptionDiv>)}
        </OptionBoxContent>
      </Toggable>
    </div>
  )
}

export default OptionBox;