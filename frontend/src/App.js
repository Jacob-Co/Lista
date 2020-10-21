import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from "styled-components";

import { setUser } from './reducer/tokenReducer'
import CategoryList from './components/CategoryList'
import HomeClock from './components/HomeClock'
import Login from './components/Login'

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
  const dispatch = useDispatch();
  const user = useSelector(state => state.token);

  useEffect(() => {
    const localUser = window.localStorage.getItem('localTicketUser');
    if (localUser) {
      const transformedUser = JSON.parse(localUser);
      dispatch(setUser(transformedUser));
    }
  }, [dispatch]);


  return (
    <>
    { 
      user !== null
      ? <TwoColumn>
          <LeftColumn>
            <CategoryList />
          </LeftColumn>
          <RightColumn>
            <HomeClock />
          </RightColumn>
        </TwoColumn>
      : <Login/>
    }
    </>
  );
}

export default App;
