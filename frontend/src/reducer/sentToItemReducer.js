import categories from '../services/categories';

export const getSentToItems = () => {
  return async (dispatch) => {
    const sentToItems = await categories.getSentToItems();
    dispatch({
      type: 'INIT_SENT_TO_ITEMS',
      data: sentToItems
    })
  }
}

const sentToItemReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_SENT_TO_ITEMS':
      return action.data;
    default:
      return state;
  }
};

export default sentToItemReducer;