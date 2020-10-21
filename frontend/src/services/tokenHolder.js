let token;

export const setToken = (givenToken) => {
  token = `bearer ${givenToken}`;
}

export const getToken = () => {
  return token;
}
