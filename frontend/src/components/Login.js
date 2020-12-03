import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducer/tokenReducer';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const StyledLoginDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 22%;
  font-family: sans-serif;
`

const ListaHeader = styled.h1`
  text-align: center;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledInputDiv = styled.div`
  margin-bottom: 1rem;
`

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const credentials = { username, password };
    dispatch(login(credentials));
    history.push('/')
  }

  return (
    <StyledLoginDiv>
      <div>
        <ListaHeader>Lista</ListaHeader>
        <StyledForm onSubmit={handleLogin}>
          <div>
            <StyledInputDiv>
              Username: 
              <input
                type="text"
                name="username"
                autoComplete="username"
              />
            </StyledInputDiv>
            <StyledInputDiv>
              Password:
              <input
                type="password"
                name="password"
                autoComplete="password"
              />
            </StyledInputDiv>
          </div>
          <button>Login</button>
        </StyledForm>
      </div>
    </StyledLoginDiv>
  )
}

export default Login;