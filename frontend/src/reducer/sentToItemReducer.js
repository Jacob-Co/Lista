import categories from '../services/categories';

export const getSentToItems = () => {
  return async (dispatch) => {
    const sentToItems = await categories.getSentTo();
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