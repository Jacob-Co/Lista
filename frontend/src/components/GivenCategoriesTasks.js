import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import io from 'socket.io-client';

import { getSentToItems } from '../reducer/sentToItemReducer';

const ItemName = styled.span`
  margin-left: 1.5rem;
  font-size: 1.07em;
  font-weight: bold;
  text-decoration-line: ${props => (props.isAccomplished ? 'line-through;' : 'none;')}
`

const GivenCategoriesTasks = () => {
  const dispatch = useDispatch();
  const sentToItems = useSelector(state => state.sentToItems);
  let socket;

  useEffect(() => {
    socket = io();
    dispatch(getSentToItems());
  }, [])


  return(
    <div>
      <h2>{'Given Categories & Tasks'}</h2>
      {sentToItems.map(item => <ItemName
          key={item.id}
        >
        {item.name}
        </ItemName>
      )}
    </div>
  )
}

export default GivenCategoriesTasks