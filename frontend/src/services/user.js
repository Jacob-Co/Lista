import axios from 'axios';
const baseUrl = 'api/user';
import token from './tokenHolder';

const getFriends = async () => {
  const config = { headers: {Authorization: token}};
  const res = await axios.get(`${baseUrl}/friends`, config);
  return res.data;
}

export default { getFriends }