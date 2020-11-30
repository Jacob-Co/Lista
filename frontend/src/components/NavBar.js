import React from 'react';
import styled from 'styled-components';

const NavBarDiv = styled.div`
  position: fixed;
  top: 0;
  margin-bottom: 2rem;
`

const NavBar = () => {
  return (
    <NavBarDiv>
      <h1>Lista</h1>
    </NavBarDiv>
  )
}

export default NavBar;