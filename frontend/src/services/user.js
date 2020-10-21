import axios from 'axios';
import token from './tokenHolder';

const baseUrl = 'api/user';

const getFriends = async () => {
  const config = { headers: {Authorization: token}};
  const res = await axios.get(`${baseUrl}/friends`, config);
  return res.data;
}

export default { getFriends }