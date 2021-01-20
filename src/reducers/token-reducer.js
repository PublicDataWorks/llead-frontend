import { handleActions } from 'redux-actions'

import { LOGIN_SUCCESS } from 'action-types/login-page'
import { UPDATE_TOKEN } from 'action-types/authentication'

export default handleActions(
  {
    [LOGIN_SUCCESS]: (state, action) => action.payload,
    [UPDATE_TOKEN]: (state, action) => ({ ...state, access: action.payload }),
  },
  {}
)
