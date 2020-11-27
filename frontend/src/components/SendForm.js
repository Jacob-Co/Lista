import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import utils from './utils';

const ButtonHolder = styled.div`
  margin-left: 1.5rem;
`
const SendForm = ({ toggleSending, item, actionReducer }) => {
  const dispatch = useDispatch();
  const friends = useSelector(state => state.friends);
  const sendFormRef = useRef();

  utils.useOutsideEventListener(sendFormRef, toggleSending);

  return(
    <div ref={sendFormRef}>
      <h3>Sending to:</h3>
      <ButtonHolder>
        {friends.map(friend => <button
          key={friend.id}
          onClick={() => {
            toggleSending();
            dispatch(actionReducer(item.id, friend.id));
          }}
        >
          {friend.username}
        </button>)}
      </ButtonHolder>
    </div>
  )
}

export default SendForm;