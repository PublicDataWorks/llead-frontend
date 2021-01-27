import { handleActions } from 'redux-actions'

import { LOGIN_FAILURE, LOGIN_SUCCESS } from 'action-types/login-page'

export default handleActions(
  {
    [LOGIN_FAILURE]: (state, action) => true, // eslint-disable-line no-unused-vars
    [LOGIN_SUCCESS]: (state, action) => false, // eslint-disable-line no-unused-vars
  },
  false
)
