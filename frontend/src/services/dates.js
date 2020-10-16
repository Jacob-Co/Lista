import axios from 'axios';
const baseUrl = '/api/dates'

const getDate = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
}

export default { getDate }