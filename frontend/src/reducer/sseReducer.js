import serverSideEvents from '../services/serverSideEvents';

const connectToSSE = async (username) => {
  const streamCode = await serverSideEvents.getStreamCode();
  const sse = await serverSideEvents.establishSSE(sse, username);
  return sse;
}

export const initializeSSE = (username) => {
  return async (dispatch) => {
    const sse = await connectToSSE(username);
    dispatch({
      type: 'INIT_SSE',
      data: sse
    })
  }
}

export const closeSSEConnection = () => {
  dispatch({
    type: 'CLOSE_SSE',
    data: null
  })
}

const sseReducer = (state, action) => {
  switch (action.type) {
    case 'INIT_SSE':
      return action.data;
    case 'CLOSE_SSE':
      state.close();
      return action.data;
    default:
      state;
  }
}

export default sseReducer;