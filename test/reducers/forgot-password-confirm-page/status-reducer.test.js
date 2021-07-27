import forgotPasswordStatusReducer from 'reducers/forgot-password-confirm-page/status-reducer'

import {
  FORGOT_PASSWORD_CONFIRM_START,
  FORGOT_PASSWORD_CONFIRM_FAILURE,
  FORGOT_PASSWORD_CONFIRM_SUCCESS,
} from 'action-types/forgot-password-confirm-page'
import { FORGOT_PASSWORD_CONFIRM_SUCCESS_MESSAGE } from 'constants/messages'

describe('#getForgotPasswordStatus', () => {
  it('should return initial state', () => {
    expect(forgotPasswordStatusReducer(undefined, {})).toEqual('')
  })

  it('should handle FORGOT_PASSWORD_START', () => {
    const result = forgotPasswordStatusReducer('', {
      type: FORGOT_PASSWORD_CONFIRM_START,
    })

    expect(result).toEqual('')
  })

  it('should handle FORGOT_PASSWORD_SUCCESS', () => {
    const result = forgotPasswordStatusReducer('', {
      type: FORGOT_PASSWORD_CONFIRM_SUCCESS,
    })

    expect(result).toEqual(FORGOT_PASSWORD_CONFIRM_SUCCESS_MESSAGE)
  })

  it('should handle FORGOT_PASSWORD_FAILURE', () => {
    const message = 'Forgot password confirm error status'
    const result = forgotPasswordStatusReducer('', {
      type: FORGOT_PASSWORD_CONFIRM_FAILURE,
      payload: {
        message,
      },
    })

    expect(result).toEqual(message)
  })
})
