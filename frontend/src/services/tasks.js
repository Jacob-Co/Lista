import axios from 'axios'
import { getToken } from './tokenHolder'
const baseUrl = '/api/tasks'

const createTask = async (task) => {
  const config = { headers: { Authorization: getToken() }};
  const res = await axios.post(baseUrl, task, config);
  return res.data;
};

const deleteTask = async (id) => {
  const config = { headers: { Authorization: getToken() }};
  await axios.delete(`${baseUrl}/${id}`, config);
}

export default { createTask, deleteTask }