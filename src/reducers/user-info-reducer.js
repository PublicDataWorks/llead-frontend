import { handleActions } from 'redux-actions'

import { USER_INFO_FETCH_SUCCESS } from 'action-types/common/user-info'
import {
  LOG_OUT_SUCCESS,
  REMOVE_TOKEN,
  LOG_OUT_FAILURE,
} from 'action-types/authentication'

export default handleActions(
  {
    [USER_INFO_FETCH_SUCCESS]: (state, action) => action.payload,
    [REMOVE_TOKEN]: () => ({}),
    [LOG_OUT_SUCCESS]: () => ({}),
    [LOG_OUT_FAILURE]: () => ({}),
  },
  {}
)
