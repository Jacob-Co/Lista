import axios from 'axios'
import { getToken } from './tokenHolder'
const baseUrl = '/api/categories'

const getAll = async () => {
  const config = { headers: { Authorization: getToken() }}
  const res = await axios.get(baseUrl, config);
  return res.data
}

const postNewCategory = async (category) => {
  const res = await axios.post(baseUrl, category)
  return res.data
}

const deleteCategory = async (id) => {
  await axios.delete(baseUrl + `/${id}`);
}

export default { getAll, postNewCategory, deleteCategory }