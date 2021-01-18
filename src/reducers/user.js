import { handleActions } from 'redux-actions'

import { LOGIN_SUCCESS } from 'action-types/login-page'

export default handleActions(
  {
    [LOGIN_SUCCESS]: (state, action) => action.payload,
  },
  {}
)
