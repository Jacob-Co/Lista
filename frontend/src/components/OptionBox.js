import React, { useRef, useState } from 'react';
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
  let clicks = 0;

  const hideOptionBox = () => {
    optionBoxRef.current.toggleVisibility(false);
  }

  const showOptionBox = () => {
    optionBoxRef.current.toggleVisibility()
  }

  utils.useOutsideEventListener(wholeCompRef, hideOptionBox);

  return(
    <div style={{"position": "relative"}} ref={wholeCompRef}>
      <div onClick={() => {
        clicks += 1;

        if (clicks > 1) return

        setTimeout(() => {
          if (clicks === 1) { // if single click
            showOptionBox();
          } else { // if double click
            if (optionsArray[0][0] === 'Toggle Done') {
              optionsArray[0][1](); // toggle done will always be first if present
            } else {
              alert(`Cannot toggle done a sent item!`)
            }
          }
          clicks = 0;
        }, 300)
      }}>
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