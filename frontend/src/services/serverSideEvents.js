import axios from 'axios';

import { getToken } from './tokenHolder'

const baseUrl = '/serverSide';

let sse;

const establishSSE = async (username) => {
  const config = { headers: { Authorization: getToken() }};
  const res = await axios.get(`${baseUrl}/requestStream`, config);
  
  if (res.data.error) return res.data;

  sse = new EventSource(`${baseUrl}/stream/${res.data.code}/${username}`);
};

  export default { establishSSE };