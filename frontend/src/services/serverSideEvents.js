import axios from 'axios';
const baseUrl = '/serverSide';

const establishSSE = async () => {
  const config = { headers: { Authorization: getToken() }};
  const res = await axios.get(`${baseUrl}/stream`, config);
  return res.data;
};

  export default { establishSSE };