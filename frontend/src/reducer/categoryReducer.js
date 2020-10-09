import categories from '../services/categories'

export const initializeCategories = () => {
  return async (dispatch) => {
    const allCategories = await categories.getAll()
    dispatch({
      type: 'INIT_CATEGORIES',
      data: allCategories
    })
  }
}

export const createNewCategory = (category) => {
  return async (dispatch) => {
    const newCategory = await categories.postNewCategory(category)
    dispatch({
      type: 'NEW_CATEGORY',
      data: newCategory
    })
  }
}

const categoryReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_CATEGORIES':
      return action.data
    case 'NEW_CATEGORY':
      return state.concat(action.data)
    default:
      return state
  }
}

export default categoryReducer
