import {
  FORGOT_PASSWORD_FAILURE_MESSAGE,
  FORGOT_PASSWORD_SUCCESS_MESSAGE,
} from 'constants/messages'
import { getForgotPasswordStatus } from 'selectors/forgot-password-page'

describe('#getForgotPasswordStatus', () => {
  it('returns null string', () => {
    const state = {
      forgotPasswordPage: {
        forgotPasswordStatus: '',
      },
    }
    const forgotPasswordStatus = getForgotPasswordStatus(state)
    expect(forgotPasswordStatus).toEqual('')
  })

  it('returns success string', () => {
    const state = {
      forgotPasswordPage: {
        forgotPasswordStatus: FORGOT_PASSWORD_SUCCESS_MESSAGE,
      },
    }

    const isLoginFailed = getForgotPasswordStatus(state)
    expect(isLoginFailed).toEqual(FORGOT_PASSWORD_SUCCESS_MESSAGE)
  })

  it('returns failure string', () => {
    const state = {
      forgotPasswordPage: {
        forgotPasswordStatus: FORGOT_PASSWORD_FAILURE_MESSAGE,
      },
    }

    const isLoginFailed = getForgotPasswordStatus(state)
    expect(isLoginFailed).toEqual(FORGOT_PASSWORD_FAILURE_MESSAGE)
  })
})
