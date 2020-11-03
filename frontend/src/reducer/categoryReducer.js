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

export const removeCategory = (id, categoryList) => {
  return async (dispatch) => {
    let updatedCategoryList = [];
    let categoriesToBeUpdated = [];
    let counter = 0;

    categoryList.forEach(category => {
      if (category.id === id) return;
      if (category.index !== counter) {
        category.index = counter;
        categoriesToBeUpdated = categoriesToBeUpdated.concat(category);
      }
      updatedCategoryList = updatedCategoryList.concat(category);
      counter += 1;
    });

    dispatch({
      type: 'UPDATE_CATEGORY',
      data: updatedCategoryList
    });

    await categories.deleteCategory(id);
    for (const category of categoriesToBeUpdated) {
      await categories.patchIndex(category.id, category.index);
    }
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

const quickSwitchTasks = (sourceIdx, destinationIdx, taskList) => {
  let newTaskList = taskList.slice();
  newTaskList.splice(sourceIdx, 1);
  newTaskList.splice(destinationIdx, 0, taskList[sourceIdx]);
  return newTaskList;
}

export const switchTaskIndexes = (sourceIdx, destinationIdx, categoryList, categoryId) => {
  return async (dispatch) => {
    let quickUpdatedTasks;
    let previousTasks;
    const quickUpdatedCategoryList = categoryList.map(category => {
      if (category.id === categoryId) {
        previousTasks = category.tasks;
        category.tasks = quickSwitchTasks(sourceIdx, destinationIdx, category.tasks);
        quickUpdatedTasks = category.tasks
      };
      return category
    })

    dispatch({
      type: 'UPDATE_CATEGORY',
      data: quickUpdatedCategoryList
    })

    for (const category of quickUpdatedCategoryList) {
      if (category.id === categoryId) {
        let counter = 0;
        for (let task of quickUpdatedTasks) {
          console.log(`task.id: ${task.id}`)
          console.log(`previosTask.id: ${previousTasks[counter].id}`)
          if (task.id !== previousTasks[counter].id) {
            task = await tasks.updateIndex(task.id, counter);
          }
          counter += 1;
        }
      };
    };
  }
}

const quickSwitchCategories = (sourceIdx, desitnationIdx, categoryList) => {
  let newCategoryList = categoryList.slice();
  newCategoryList.splice(sourceIdx, 1);
  if (desitnationIdx === 0 && categoryList[0].extraInfo) {
    newCategoryList.splice(desitnationIdx, 1, categoryList[sourceIdx]);
  } else {
    newCategoryList.splice(desitnationIdx, 0, categoryList[sourceIdx]);
  }
  if (sourceIdx === 0) {
    const placeHolderCategory = {
      id: 'placeHolder',
      name: '--none--',
      index: 0,
      workingOn: false,
      extraInfo: 'placeHolder'
    };
    newCategoryList.splice(0, 0, placeHolderCategory);
  }
  return newCategoryList
}

export const switchCategoryIndexes = (sourceIdx, desitnationIdx, categoryList) => {
  return async(dispatch) => {
    const quickUpdatedCategoryList = quickSwitchCategories(sourceIdx, desitnationIdx, categoryList);
    dispatch({
      type: 'UPDATE_CATEGORY',
      data: quickUpdatedCategoryList
    })

    let counter = 0;
    // let updatedCategoryList = [];

    for (const category of quickUpdatedCategoryList) {
      if (category.index !== counter) {
        if (category.extraInfo) continue;
        if (counter === 0) {
          const updatedWorkingOn = await categories.patchWorkingOn(category.id);
          counter += 1;
          // updatedCategoryList = updatedCategoryList.concat(updatedWorkingOn);
          continue;
        }
        const updatedCategory = await categories.patchIndex(category.id, counter);
        counter += 1;
        // updatedCategoryList = updatedCategoryList.concat(updatedCategory);
      } else {
        counter += 1;
        // updatedCategoryList = updatedCategoryList.concat(category);
      }
    }

    // dispatch({
    //   type: 'UPDATE_CATEGORY',
    //   data: updatedCategoryList
    // })
  }
}

export const removeTask = (taskId, category) => {
  return async (dispatch) => {
    const updatedCategory = category;
    updatedCategory.tasks = category.tasks.filter(task => task.id !== taskId);

    dispatch({
      type: 'REMOVE_TASK',
      data: updatedCategory
    })

    await tasks.deleteTask(taskId);
  }
}

export const makeTaskWorkingOn = (paramCategory, task, categoryList, categoryArrayPosition) => {
  /*
    1. get category and task, place obj inside categories taskWorkingOn prop
      1.1 parameter category obj and task obj
    2. call map and replace the old category with the new updated category (can get the current cat array position here)
    3. call switchCategoryIndexes (category array position, 0, modified categoryList)
    4. await service to update taskWorkingOn
  */
  return async (dispatch) => {
    paramCategory.taskWorkingOn = task;
    categoryList.map(category => {
      if (category.id === paramCategory.id) {
        return paramCategory;
      }
      return category
    });
    await switchCategoryIndexes(categoryArrayPosition, 0, categoryList);
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
    case 'REMOVE_TASK':
      return state.map(category => {
        if (category.id === action.data.id) {
          return action.data;
        }
        return category;
      });
    case 'UPDATE_CATEGORY':
      return action.data;
    default:
      return state
  }
}

export default categoryReducer
