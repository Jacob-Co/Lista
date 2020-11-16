import axios from 'axios';
const baseUrl = '/serverSide';

let sse;

const establishSSE = async () => {
  const config = { headers: { Authorization: getToken() }};
  const res = await axios.get(`${baseUrl}/requestStream`, config);
  
  if (res.data.error) return res.data;

  sse = new EventSource(`${baseUrl}/stream/${res.data.code}`);
};

  export default { establishSSE };