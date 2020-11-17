import axios from 'axios';

import { getToken } from './tokenHolder'

const baseUrl = '/serverSide';
let SSE;

const getStreamCode = async () => {
  const config = { headers: { Authorization: getToken() }};
  const res = await axios.get(`${baseUrl}/requestStream`, config);
  
  if (res.data.error) return res.data;
  return res.data.code;
};

const establishSSE = (code, username) => {
  return new EventSource(`${baseUrl}/stream/${code}/${username}`)
}

export default { getStreamCode, establishSSE };