import userReducer from 'reducers/user'

import { LOGIN_SUCCESS } from 'action-types/login-page'

describe('#userReducer', () => {
  it('should return initial state', () => {
    expect(userReducer(undefined, {})).toStrictEqual({})
  })

  it('should handle LOGIN_SUCCESS', () => {
    const authenticationData = { accessToken: 'accesstoken' }

    const result = userReducer(
      {},
      {
        type: LOGIN_SUCCESS,
        payload: authenticationData,
      }
    )

    expect(result).toStrictEqual(authenticationData)
  })
})
