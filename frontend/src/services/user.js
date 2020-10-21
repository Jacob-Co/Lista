import axios from 'axios';
import { getToken } from './tokenHolder';

const baseUrl = 'api/user';

const getFriends = async () => {
  const config = { headers: {Authorization: getToken()}};
  const res = await axios.get(`${baseUrl}/friends`, config);
  return res.data;
}

export default { getFriends }