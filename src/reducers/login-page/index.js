import { combineReducers } from 'redux'

import isLoginFailedReducer from './is-login-failed-reducer'
import previousLocationReducer from './previous-location-reducer'

export default combineReducers({
  isLoginFailed: isLoginFailedReducer,
  previousLocation: previousLocationReducer,
})
