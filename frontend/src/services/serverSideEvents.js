import axios from 'axios';

import { getToken } from './tokenHolder'

const baseUrl = '/serverSide';

const getStreamCode = async (username) => {
  const config = { headers: { Authorization: getToken() }};
  const res = await axios.get(`${baseUrl}/requestStream`, config);
  
  if (res.data.error) return res.data;
  return res.data.code;
};

  export default { getStreamCode };