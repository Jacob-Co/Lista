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
        if (category.id === action.data.task.superCategory) category.tasks.concat(action.data.task);
        return category;
      });
    default:
      return state
  }
}

export default categoryReducer
