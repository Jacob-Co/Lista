import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { logout } from '../reducer/tokenReducer'

const LogoutDiv = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(state => state.token);
  const handleLogout = () => {
    dispatch(logout());
    history.push('/');
  }

  return (
    <LogoutDiv>
      {`Greetings ${user.username}!    `}
      <button onClick={handleLogout}>Logout</button>
    </LogoutDiv>
  )
}

export default Logout