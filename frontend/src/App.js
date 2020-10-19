import React from 'react'
import styled from "styled-components";

import CategoryList from './components/CategoryList'
import HomeClock from './components/HomeClock'

const TwoColumn = styled.div`
  display: flex;
  height: 100%;
`

const LeftColumn = styled.div`
  width: 31%;
  box-sizing: border-box;
  margin-left: 1rem;
`

const RightColumn = styled.div`
  width: 69%;
  box-sizing: border-box;
  border-left: 2px solid;
`

function App() {
  return (
    <TwoColumn>
      <LeftColumn>
        <CategoryList />
      </LeftColumn>
      <RightColumn>
        <HomeClock />
      </RightColumn>
    </TwoColumn>
  );
}

export default App;
