import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const ButtonHolder = styled.div`
  margin-left: 1.5rem;
`

const useOutsideEventListener = (ref, callback) => {
  useEffect(() => {
    const clickedOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener('mousedown', clickedOutside);
    return () => {
      document.removeEventListener('mousedown', clickedOutside);
    }
  }, [ref])
};

const SendForm = ({ hideSendForm }) => {
  const friends = useSelector(state => state.friends);
  const sendFormRef = useRef();

  useOutsideEventListener(sendFormRef, hideSendForm);

  return(
    <div ref={sendFormRef}>
      <h3>Sending to:</h3>
      <ButtonHolder>
        {friends.map(friend => <button
          key={friend.id}
        >
          {friend.username}
        </button>)}
      </ButtonHolder>
    </div>
  )
}

export default SendForm;