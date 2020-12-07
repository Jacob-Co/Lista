import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from "styled-components";
import { Route, Switch } from 'react-router-dom';

import { setUser } from './reducer/tokenReducer'
import CategoryList from './components/CategoryList'
import Login from './components/Login'
import FriendsList from './components/FriendsList'
import FriendCategoriesView from './components/FriendCategoriesView'
import SSEListener from './components/SSEListener'
import NavBar from './components/NavBar';
import FAQ from './components/FAQ';

import { initializeFriends } from './reducer/friendReducer';

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

const MainContentDiv = styled.div`
  margin: 0 auto 1rem auto;
  width: 95%;
  max-width: 700px;
`
const MainDiv = styled.div`
  font-family: sans-serif;
  height: 100%;
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
    dispatch(initializeFriends());
  }, [dispatch]);


  return (
    <>
    { user !== null
      ? <MainDiv>
          <NavBar/>
          <SSEListener username={user.username} />
          <MainContentDiv>
            <Switch>
              <Route path="/friends">
                <FriendsList />
              </Route>

              <Route path="/friend/categories/:id">
                <FriendCategoriesView />
              </Route>

              <Route path="/FAQ">
                <FAQ />
              </Route>

              <Route path="/">
                  <CategoryList />
              </Route>
            </Switch>
          </MainContentDiv>
        </MainDiv>
      : <Login/>
    }
    {/* { 
      user !== null
      ? <TwoColumn>
          <SSEListener username={user.username} />
          <LeftColumn>
            <Switch>
              <Route path="/">
                <CategoryList />
              </Route>
            </Switch>
          </LeftColumn>
          <RightColumn>
            <Logout />
            <FriendsList />
            <Switch>
              <Route path="/friend/categories/:id">
                <FriendCategoriesView />
              </Route>
              <Route path="/">
                <HomeClock />
              </Route>
            </Switch>
          </RightColumn>
        </TwoColumn>
      : <Login/>
    } */}
    </>
  );
}

export default App;
