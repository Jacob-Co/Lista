import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import OptionBox from './OptionBox';
import HomeClock from './HomeClock';
import { closeSSEConnection } from '../reducer/sseReducer';
import { logout } from '../reducer/tokenReducer';

const NavBarDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  padding-left: .45rem;
  justify-content: space-between
`
const ListaHeader = styled.h1`
  margin: 0;
  margin-left: .45rem;
`
const RightDiv = styled.div`
  display: flex;
  align-items: center;
`
const LeftDiv = styled.div`
  margin-right: .55rem;
`

const NavBar = () => {
const dispatch = useDispatch();
const history = useHistory();
const urlExtension = useLocation().pathname;

const handleLogout = () => {
  dispatch(closeSSEConnection());
  dispatch(logout());
  history.push('/');
}

const handleFriends = () => {
  history.push('/friends');
}

const handleHome = () => {
  history.push('/');
}

const optionsToBePassed = (urlExtension) => {
  const logout = ['Logout', handleLogout];
  const viewFriendsList = ['Friends', handleFriends];
  const returnHome = ['Home', handleHome];

  if (urlExtension === '/friends') return [returnHome, logout]
  return [viewFriendsList, logout]
}

  return (
    <NavBarDiv>
      <RightDiv>
        <OptionBox
          optionsArray={optionsToBePassed(urlExtension)}
          icon={<>&#x2630;</>}
        />
        <ListaHeader>Lista</ListaHeader>
      </RightDiv>
      <LeftDiv>
        <HomeClock />
      </LeftDiv>
    </NavBarDiv>
  )
}

export default NavBar;