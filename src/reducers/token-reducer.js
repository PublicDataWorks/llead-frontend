import { handleActions } from 'redux-actions'

import { LOGIN_SUCCESS } from 'action-types/login-page'
import { UPDATE_TOKEN, LOG_OUT } from 'action-types/authentication'

export default handleActions(
  {
    [LOGIN_SUCCESS]: (state, action) => action.payload,
    [UPDATE_TOKEN]: (state, action) => ({ ...state, access: action.payload }),
    [LOG_OUT]: (state, action) => ({}), // eslint-disable-line no-unused-vars
  },
  {}
)
