import { getIsLoginFailed, getPreviousLocation } from 'selectors/login-page'

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

describe('#getPreviousLocation', () => {
  it('returns undefined', () => {
    const previousLocation = getPreviousLocation({})
    expect(previousLocation).toEqual(undefined)
  })

  it('returns previous location', () => {
    const state = {
      loginPage: {
        previousLocation: {
          location: '/departments/1'
        },
      },
    }

    const previousLocation = getPreviousLocation(state)
    expect(previousLocation).toEqual({
      location: '/departments/1'
    })
  })
})

