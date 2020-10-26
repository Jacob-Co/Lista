import categoryService from '../services/categories';

export const initializeFriendCategories = (id) => {
  return async (dispatch) => {
    const friendCategories = await categoryService.getFriendCategories(id);
    dispatch({
      type: 'INIT_F_CATEGORIES',
      data: friendCategories
    })
  }
}

const friendCategoryReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_F_CATEGORIES':
      return action.data;
    default:
      return state;
  }
}

export default friendCategoryReducer;