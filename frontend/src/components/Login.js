import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducer/tokenReducer'
import { useHistory } from 'react-router-dom'

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
    <div>
      <h1>Login to Ticket Book</h1>
      <form onSubmit={handleLogin}>
        <div>
          Username: 
          <input
            type="text"
            name="username"
            autoComplete="username"
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            name="password"
            autoComplete="password"
          />
        </div>
        <button>Login</button>
      </form>
    </div>
  )
}

export default Login;