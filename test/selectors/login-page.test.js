import { getIsLoginFailed } from 'selectors/login-page'

describe('#getIsLoginFailed', () => {
  it('returns false', () => {
    const isLoginFailed = getIsLoginFailed({})
    expect(isLoginFailed).toEqual(false)
  })

  it('returns true', () => {
    const state = {
      loginPage: {
        isLoginFailed: true,
      },
    }

    const isLoginFailed = getIsLoginFailed(state)
    expect(isLoginFailed).toEqual(true)
  })
})
