import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const ButtonHolder = styled.div`
  margin-left: 1.5rem;
`

const SendForm = () => {
  const friends = useSelector(state => state.friends);

  return(
    <div>
      <h2>Sending to:</h2>
      <ButtonHolder>
        {friends.map(friend => <button>
          {friend.name}
        </button>)}
      </ButtonHolder>
    </div>
  )
}

export default SendForm;