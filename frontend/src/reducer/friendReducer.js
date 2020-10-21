import user from '../services/user';
import userService from '../services/user';

export const initializeFriends = () => {
  return async (dispatch) => {
    const friends = await userService.getFriends();
    dispatch({
      type: 'INIT_FRIENDS',
      data: friends
    })
  }
}

const friendReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_FRIENDS':
      return action.data;
    default:
      return state;
  }
}

export default friendReducer;