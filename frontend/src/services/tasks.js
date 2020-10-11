import axios from 'axios'
const baseUrl = '/api/tasks'

const createTask = async (task) => {
  const res = await axios.post(baseUrl, task);
  return res.data;
};

export default { createTask }