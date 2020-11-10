import categories from '../services/categories';

const sentToItemReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_SENT_TO_ITEMS':
      return action.data;
    default:
      return state;
  }
};

export default sentToItemReducer;