import dates from '../services/dates'

export const setDate = () => {
  return async (dispatch) => {
    const {date} = await dates.getDate();
    dispatch({
      type: "SET_DATE",
      data: date
    })
  }
}

const dateReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_DATE":
      return action.data;
    default:
      return state
  }
}

export default dateReducer;