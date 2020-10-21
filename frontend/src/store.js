import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import categoryReducer from './reducer/categoryReducer'
import dateReducer from './reducer/dateReducer'
import tokenReducer from './reducer/tokenReducer'

const reducer = combineReducers({
  categories: categoryReducer,
  date: dateReducer,
  token: tokenReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;