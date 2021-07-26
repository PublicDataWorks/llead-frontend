import { getForgotPasswordConfirmStatus } from 'selectors/forgot-password-confirm-page'

describe('#getForgotPasswordConfirmStatus', () => {
  it('returns empty string', () => {
    const state = {
      forgotPasswordConfirmPage: {
        status: '',
      },
    }
    const forgotPasswordConfirmtatus = getForgotPasswordConfirmStatus(state)
    expect(forgotPasswordConfirmtatus).toEqual('')
  })

  it('returns status', () => {
    const state = {
      forgotPasswordConfirmPage: {
        status: 'any status',
      },
    }

    const passwordConfirmStatus = getForgotPasswordConfirmStatus(state)
    expect(passwordConfirmStatus).toEqual('any status')
  })
})
