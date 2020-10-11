import axios from 'axios'
const baseUrl = '/api/categories'

const getAll = async () => {
  const res = await axios.get(baseUrl)
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