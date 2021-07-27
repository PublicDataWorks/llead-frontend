import { handleActions } from 'redux-actions'

import {
  FORGOT_PASSWORD_CONFIRM_START,
  FORGOT_PASSWORD_CONFIRM_FAILURE,
  FORGOT_PASSWORD_CONFIRM_SUCCESS,
} from 'action-types/forgot-password-confirm-page'
import { FORGOT_PASSWORD_CONFIRM_SUCCESS_MESSAGE } from 'constants/messages'

export default handleActions(
  {
    /* eslint-disable no-unused-vars */
    [FORGOT_PASSWORD_CONFIRM_START]: (state, action) => '',
    [FORGOT_PASSWORD_CONFIRM_SUCCESS]: (state, action) =>
      FORGOT_PASSWORD_CONFIRM_SUCCESS_MESSAGE,
    [FORGOT_PASSWORD_CONFIRM_FAILURE]: (state, action) =>
      action.payload.message,
    /* eslint-enable no-unused-vars */
  },
  ''
)
