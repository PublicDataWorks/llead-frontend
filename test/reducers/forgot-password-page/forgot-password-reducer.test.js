import forgotPasswordStatusReducer from 'reducers/forgot-password-page/forgot-password-status-reducer'

import {
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
} from 'action-types/forgot-password-page'
import {
  FORGOT_PASSWORD_FAILURE_MESSAGE,
  FORGOT_PASSWORD_SUCCESS_MESSAGE,
} from 'constants/messages'

describe('#getForgotPasswordStatus', () => {
  it('should return initial state', () => {
    expect(forgotPasswordStatusReducer(undefined, {})).toEqual('')
  })

  it('should handle FORGOT_PASSWORD_START', () => {
    const result = forgotPasswordStatusReducer('', {
      type: FORGOT_PASSWORD_START,
    })

    expect(result).toEqual('')
  })

  it('should handle FORGOT_PASSWORD_SUCCESS', () => {
    const result = forgotPasswordStatusReducer('', {
      type: FORGOT_PASSWORD_SUCCESS,
    })

    expect(result).toEqual(FORGOT_PASSWORD_SUCCESS_MESSAGE)
  })

  it('should handle FORGOT_PASSWORD_FAILURE', () => {
    const result = forgotPasswordStatusReducer('', {
      type: FORGOT_PASSWORD_FAILURE,
    })

    expect(result).toEqual(FORGOT_PASSWORD_FAILURE_MESSAGE)
  })
})
