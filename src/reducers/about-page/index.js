import { combineReducers } from 'redux'

import qAndAReducer from './q-and-a-reducer'

export default combineReducers({
  about: qAndAReducer,
})
