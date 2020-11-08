import axios from 'axios'
import { getToken } from './tokenHolder'
const baseUrl = '/api/categories'

const getAll = async () => {
  const config = { headers: { Authorization: getToken() }}
  const res = await axios.get(baseUrl, config);
  return res.data
}

const postNewCategory = async (category) => {
  const config = { headers: { Authorization: getToken() }}
  const res = await axios.post(baseUrl, category, config);
  return res.data
}

const deleteCategory = async (id) => {
  await axios.delete(baseUrl + `/${id}`);
}

const patchIndex = async (id, index) => {
  const config = { headers: { Authorization: getToken() }}
  const res = await axios.patch(`${baseUrl}/index/${id}`, { index }, config);
  return res.data;
}

const patchWorkingOn = async (id) => {
  const config = { headers: { Authorization: getToken() }}
  const res = await axios.patch(`${baseUrl}/workingOn/${id}`, {}, config);
  return res.data;
}

const getFriendCategories = async (id) => {
  const config = { headers: { Authorization: getToken() }};
  const res = await axios.get(`${baseUrl}/friend/${id}`, config);
  return res.data;
}

const patchTaskWorkingOn = async (categoryId, taskId) => {
  const config = { headers: { Authorization: getToken() }};
  const res = await axios.patch(`${baseUrl}/taskWorkingOn/${categoryId}`, { taskId }, config);
  return res.data;
}

const patchAccomplishedCategory = async (categoryId, accomplished) => {
  const config = { headers: { Authorization: getToken() }};
  const res = await axios.patch(`${baseUrl}/accomplished/${categoryId}`, { accomplished }, config);
  return res.data;
}

export default {
  getAll,
  postNewCategory,
  deleteCategory,
  patchIndex,
  patchWorkingOn,
  getFriendCategories,
  patchTaskWorkingOn,
  patchAccomplishedCategory,
}