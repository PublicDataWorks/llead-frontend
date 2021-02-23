import { combineReducers } from 'redux'

import departmentReducer from './department-reducer'

export default combineReducers({
  department: departmentReducer,
})
