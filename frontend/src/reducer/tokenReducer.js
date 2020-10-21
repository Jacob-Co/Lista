import loginService from '../services/login';

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem(localStorageKey, user.token);
      dispatch({
        type: 'LOGIN',
        data: user
      })
    } catch {
      console.log('Wrong credentials please try again');
    }
  }
}

export const logout = () => {
  window.localStorage.removeItem(localStorageKey)
  return {
    action: 'LOGOUT'
  }
}

const tokenReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
}

export default tokenReducer;