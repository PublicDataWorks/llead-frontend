import isLoginFailedReducer from 'reducers/login-page/is-login-failed-reducer'

import { LOGIN_SUCCESS, LOGIN_FAILURE } from 'action-types/login-page'

describe('#isLoginFailedReducer', () => {
  it('should return initial state', () => {
    expect(isLoginFailedReducer(undefined, {})).toEqual(false)
  })

  it('should handle LOGIN_SUCCESS', () => {
    const result = isLoginFailedReducer(true, {
      type: LOGIN_SUCCESS,
    })

    expect(result).toEqual(false)
  })

  it('should handle LOGIN_FAILURE', () => {
    const result = isLoginFailedReducer(false, {
      type: LOGIN_FAILURE,
    })

    expect(result).toEqual(true)
  })
})
