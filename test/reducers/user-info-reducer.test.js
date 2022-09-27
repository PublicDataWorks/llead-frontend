import userInfoReducer from 'reducers/user-info-reducer'

import { USER_INFO_FETCH_SUCCESS } from 'action-types/common/user-info'
import {
  LOG_OUT_SUCCESS,
  REMOVE_TOKEN,
  LOG_OUT_FAILURE,
} from 'action-types/authentication'

describe('#userInfoReducer', () => {
  it('should return initial state', () => {
    expect(userInfoReducer(undefined, {})).toStrictEqual({})
  })

  it('handles USER_INFO_FETCH_SUCCESS', () => {
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

  it('handles REMOVE_TOKEN', () => {
    const userInfo = { email: 'user@mail.com' }

    const result = userInfoReducer(userInfo, {
      type: REMOVE_TOKEN,
    })

    expect(result).toStrictEqual({})
  })

  it('handles LOG_OUT_SUCCESS', () => {
    const userInfo = { email: 'user@mail.com' }

    const result = userInfoReducer(userInfo, {
      type: LOG_OUT_SUCCESS,
    })

    expect(result).toStrictEqual({})
  })

  it('handles LOG_OUT_FAILURE', () => {
    const userInfo = { email: 'user@mail.com' }

    const result = userInfoReducer(userInfo, {
      type: LOG_OUT_FAILURE,
    })

    expect(result).toStrictEqual({})
  })
})
