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

const quickSwitch = (categorySource, categoryDestination, categoryList) => {
  let newCategoryList = categoryList.slice();
  newCategoryList.splice(categorySource.index, 1);
  newCategoryList.splice(categoryDestination.index, 0, categorySource);
  return newCategoryList
}

export const switchIndexes = (categorySource, categoryDestination, categoryList) => {
  return async(dispatch) => {

    dispatch({
      type: 'SWITCH_INDEXES',
      data: quickSwitch(categorySource, categoryDestination, categoryList)
    })

    const sourceIndex = categorySource.index;
    const destinationIndex = categoryDestination.index;
    const newCategorySource = await categories.patchIndex(categorySource.id, destinationIndex);
    const newCategoryDestination = await categories.patchIndex(categoryDestination.id, sourceIndex);

    const updatedCategoryList = categoryList.map(category => {
      if (category.index === sourceIndex) return newCategoryDestination;
      if (category.index === destinationIndex) return newCategorySource;
      return category;
    })

    dispatch({
      type: 'SWITCH_INDEXES',
      data: updatedCategoryList
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
      return action.data;
    default:
      return state
  }
}

export default categoryReducer
