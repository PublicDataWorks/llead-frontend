import { combineReducers } from 'redux'

import forgotPasswordStatusReducer from './forgot-password-status-reducer'

export default combineReducers({
  forgotPasswordStatus: forgotPasswordStatusReducer,
})
