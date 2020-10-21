let token;

export const setToken = (givenToken) => {
  token = `bearer ${givenToken}`;
}

export default token;