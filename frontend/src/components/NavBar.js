import React from 'react';
import styled from 'styled-components';

import OptionBox from './OptionBox';
import HomeClock from './HomeClock';

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
  return (
    <NavBarDiv>
      <RightDiv>
        <OptionBox
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