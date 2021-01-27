import { combineReducers } from 'redux'

import isLoginFailedReducer from './is-login-failed-reducer'

export default combineReducers({
  isLoginFailed: isLoginFailedReducer,
})
