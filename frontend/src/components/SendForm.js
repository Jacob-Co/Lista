import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import patchSentTo from '../reducer/categoryReducer';

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

const SendForm = ({ hideSendForm, item }) => {
  const dispatch = useDispatch();
  const friends = useSelector(state => state.friends);
  const sendFormRef = useRef();

  useOutsideEventListener(sendFormRef, hideSendForm);

  return(
    <div ref={sendFormRef}>
      <h3>Sending to:</h3>
      <ButtonHolder>
        {friends.map(friend => <button
          key={friend.id}
          onClick={() => {
            hideSendForm();
            dispatch(patchSentTo(item.id, friend.id));
          }}
        >
          {friend.username}
        </button>)}
      </ButtonHolder>
    </div>
  )
}

export default SendForm;