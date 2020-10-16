import React from 'react'
import styled from "styled-components";

import CategoryList from './components/CategoryList'

const TwoColumn = styled.div`
  display: flex;
  height: 100%;
`

const LeftColumn = styled.div`
  width: 30%;
  box-sizing: border-box;
`

const RightColumn = styled.div`
  width: 70%;
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
        Right
      </RightColumn>
    </TwoColumn>
  );
}

export default App;
