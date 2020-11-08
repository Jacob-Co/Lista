import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

import Toggable from './Toggable';

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

const useOutsideEventListener = (ref, callback) => {
  useEffect(() => {
    const hideOptionBox = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener('mousedown', hideOptionBox);
    return () => {
      document.removeEventListener('mousedown', hideOptionBox);
    }
  }, [ref])
};

const OptionBox = ({ optionsArray = [], checked }) => {
  const optionBoxRef = useRef();
  const wholeCompRef = useRef();

  const hideOptionBox = () => {
    optionBoxRef.current.toggleVisibility(false);
  }

  const showOptionBox = () => {
    optionBoxRef.current.toggleVisibility()
  }

  useOutsideEventListener(wholeCompRef, hideOptionBox);

  return(
    <div style={{"position": "relative"}} ref={wholeCompRef}>
      <div onClick={showOptionBox}>
        { checked ? <CheckBox>&#9745;</CheckBox> : <CheckBox>&#9744;</CheckBox>}
      </div>
      <Toggable ref={optionBoxRef}>
        <OptionBoxContent>
          {optionsArray.map((option, idx) => <OptionDiv key={idx}
              onClick={() => {
                option[1]();
                // optionBoxRef.current.toggleVisibility(false);
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