import axios from 'axios'
import { getToken } from './tokenHolder'
const baseUrl = '/api/categories'

const getAll = async () => {
  const config = { headers: { Authorization: getToken() }}
  const res = await axios.get(baseUrl, config);
  return res.data
}

const getSentTo = async () => {
  const config = { headers: { Authorization: getToken() }};
  const res = await axios.get(`${baseUrl}/sentTo`, config);
  return res.data;
}

const postNewCategory = async (category) => {
  const config = { headers: { Authorization: getToken() }}
  const res = await axios.post(baseUrl, category, config);
  return res.data
}

const deleteCategory = async (id) => {
  const config = { headers: { Authorization: getToken() }}
  await axios.delete(baseUrl + `/${id}`, config);
}

const patchIndex = async (id, index) => {
  const config = { headers: { Authorization: getToken() }}
  const res = await axios.patch(`${baseUrl}/index/${id}`, { index }, config);
  return res.data;
}

const patchWorkingOn = async (id, isSentCategory, isWorkingOn) => {
  const config = { headers: { Authorization: getToken() }}
  const res = await axios.patch(`${baseUrl}/workingOn/${id}`, { isSentCategory, isWorkingOn }, config);
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

const patchCategoryName = async (cateogryId, name) => {
  const config = { headers: { Authorization: getToken() }};
  const res = await axios.patch(`${baseUrl}/name/${cateogryId}`, { name }, config);
  return res.data;
}

const patchSentTo = async (categoryId, sentTo) => {
  const config = { headers: { Authorization: getToken() }};
  const res = await axios.patch(`${baseUrl}/sentTo/${categoryId}`, { sentTo }, config);
  return res.data;
}

const patchSentToIndex = async (categoryId, sentToIndex) => {
  const config = { headers: { Authorization: getToken() }};
  const res = await axios.patch(`${baseUrl}/sentToIndex/${categoryId}`, { sentToIndex }, config);
  return res.data;
}

export default {
  getAll,
  getSentTo,
  postNewCategory,
  deleteCategory,
  patchIndex,
  patchWorkingOn,
  getFriendCategories,
  patchTaskWorkingOn,
  patchAccomplishedCategory,
  patchCategoryName,
  patchSentTo,
  patchSentToIndex
}