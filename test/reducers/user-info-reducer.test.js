import userInfoReducer from 'reducers/user-info-reducer'

import { USER_INFO_FETCH_SUCCESS } from 'action-types/common/user-info'

describe('#userInfoReducer', () => {
  it('should return initial state', () => {
    expect(userInfoReducer(undefined, {})).toStrictEqual({})
  })

  it('should handle USER_INFO_FETCH_SUCCESS', () => {
    const userInfo = { email: 'user@mail.com' }

    const result = userInfoReducer(
      {},
      {
        type: USER_INFO_FETCH_SUCCESS,
        payload: userInfo,
      }
    )

    expect(result).toStrictEqual(userInfo)
  })
})
