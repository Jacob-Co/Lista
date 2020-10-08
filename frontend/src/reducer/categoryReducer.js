import categories from '../services/categories'

export const initializeCategories = () => {
  return async (dispatch) => {
    const allCategories = await categories.getAll()
    const allCategoriesHash = {}
    allCategories.forEach(category => {
      allCategoriesHash[category.id] = category
    })
    dispatch({
      type: 'INIT_CATEGORIES',
      data: allCategoriesHash
    })
  }
}

const categoryReducer = (state = {}, action) => {
  switch (action.type) {
    case 'INIT_CATEGORIES':
      return action.data
    default:
      return state
  }
}

export default categoryReducer
