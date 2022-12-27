import { handleActions } from 'redux-actions'

import { LOGIN_SUCCESS } from 'action-types/login-page'
import {
  UPDATE_TOKEN,
  LOG_OUT_SUCCESS,
  REMOVE_TOKEN,
  LOG_OUT_FAILURE,
} from 'action-types/authentication'

export default handleActions(
  {
    [LOGIN_SUCCESS]: (state, action) => action.payload,
    [UPDATE_TOKEN]: (state, action) => ({ ...state, access: action.payload }),
    [LOG_OUT_SUCCESS]: (state, action) => ({}), // eslint-disable-line no-unused-vars
    [LOG_OUT_FAILURE]: (state, action) => ({}), // eslint-disable-line no-unused-vars
    [REMOVE_TOKEN]: (state, action) => ({}), // eslint-disable-line no-unused-vars
  },
  {}
)
