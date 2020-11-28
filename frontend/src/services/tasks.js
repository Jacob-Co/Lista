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

const updateIndex = async (id, index) => {
  const config = { headers: { Authorization: getToken() }};
  const res = await axios.patch(`${baseUrl}/index/${id}`, { index }, config);
  return res.data;
}

const updateAccomplished = async (id, accomplished) => {
  const config = { headers: { Authorization: getToken() }};
  const res = await axios.patch(`${baseUrl}/accomplished/${id}`, { accomplished }, config);
  return res.data;
}

const updateName = async (id, name) => {
  const config = { headers: { Authorization: getToken() }};
  const res = await axios.patch(`${baseUrl}/name/${id}`, { name }, config);
  return res.data;
}

const updateSentTo = async (id, receiverId) => {
  const config = { headers: { Authorization: getToken() }};
  const res = await axios.patch(`${baseUrl}/sent/${id}`, { sentTo: receiverId }, config);
  return res.data;
}

export default { createTask, deleteTask, updateIndex, updateAccomplished, updateName, updateSentTo };