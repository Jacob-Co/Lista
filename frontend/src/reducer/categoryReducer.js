import categories from '../services/categories'
import tasks from '../services/tasks'

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

export const removeCategory = (id) => {
  return async (dispatch) => {
    await categories.deleteCategory(id);
    dispatch({
      type: 'REMOVE_CATEGORY',
      data: { id },
    })
  }
}

export const createNewTask = (task) => {
  return async(dispatch) => {
    const newTask = await tasks.createTask(task);
    dispatch({
      type: 'NEW_TASK',
      data: {
        task: newTask,
      }
    })
  }
}

export const switchIndexes = (category1, category2) => {
  return async(dispatch) => {
    const newCategoryIndex1 = category2.index;
    const newCategoryIndex2 = category1.index;
    const newCategory1 = await categories.patchIndex(category1.id, newCategoryIndex1);
    const newCategory2 = await categories.patchIndex(category2.id, newCategoryIndex2);
    const newCategoryKey1 = category2.id; // used to find category2 in state and change it with category1
    const newCategoryKey2 = category1.id;
    const data = {};
    data[newCategoryKey1] = newCategory1;
    data[newCategoryKey2] = newCategory2; 
    dispatch({
      type: 'SWITCH_INDEXES',
      data
    })
  }
}

const categoryReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_CATEGORIES':
      return action.data
    case 'NEW_CATEGORY':
      return state.concat(action.data)
    case 'REMOVE_CATEGORY':
      return state.filter(category => category.id !== action.data.id);
    case 'NEW_TASK':
      return state.map(category => {
        if (category.id === action.data.task.category) {
          category.tasks = category.tasks.concat(action.data.task);
        }
        return category;
      });
    case 'SWITCH_INDEXES':
      return state.map(category => {
        if (action.data[category.id]) {
          return action.data[category.id];
        }
        return category;
      });
    default:
      return state
  }
}

export default categoryReducer
