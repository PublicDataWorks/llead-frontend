import { handleActions } from 'redux-actions'

import {
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
} from 'action-types/forgot-password-page'
import {
  FORGOT_PASSWORD_SUCCESS_MESSAGE,
  FORGOT_PASSWORD_FAILURE_MESSAGE,
} from 'constants/messages'

export default handleActions(
  {
    /* eslint-disable no-unused-vars */
    [FORGOT_PASSWORD_START]: (state, action) => '',
    [FORGOT_PASSWORD_SUCCESS]: (state, action) =>
      FORGOT_PASSWORD_SUCCESS_MESSAGE,
    [FORGOT_PASSWORD_FAILURE]: (state, action) =>
      FORGOT_PASSWORD_FAILURE_MESSAGE,
    /* eslint-enable no-unused-vars */
  },
  ''
)
