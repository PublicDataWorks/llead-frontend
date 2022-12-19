import tokenReducer from 'reducers/token-reducer'

import { LOGIN_SUCCESS } from 'action-types/login-page'
import {
  UPDATE_TOKEN,
  LOG_OUT_SUCCESS,
  REMOVE_TOKEN,
  LOG_OUT_FAILURE,
} from 'action-types/authentication'

describe('#tokenReducer', () => {
  it('should return initial state', () => {
    expect(tokenReducer(undefined, {})).toStrictEqual({})
  })

  it('should handle LOGIN_SUCCESS', () => {
    const authenticationData = {
      access: 'accessToken',
      refresh: 'refreshToken',
    }

    const result = tokenReducer(
      {},
      {
        type: LOGIN_SUCCESS,
        payload: authenticationData,
      }
    )

    expect(result).toStrictEqual(authenticationData)
  })

  it('should handle UPDATE_TOKEN', () => {
    const token = 'newAccessToken'

    const result = tokenReducer(
      {
        access: 'accessToken',
        refresh: 'refreshToken',
      },
      {
        type: UPDATE_TOKEN,
        payload: token,
      }
    )

    expect(result).toStrictEqual({
      access: 'newAccessToken',
      refresh: 'refreshToken',
    })
  })

  it('should handle LOG_OUT_SUCCESS', () => {
    const result = tokenReducer(
      {
        access: 'accessToken',
        refresh: 'refreshToken',
      },
      {
        type: LOG_OUT_SUCCESS,
      }
    )

    expect(result).toStrictEqual({})
  })

  it('should handle LOG_OUT_FAILURE', () => {
    const result = tokenReducer(
      {
        access: 'accessToken',
        refresh: 'refreshToken',
      },
      {
        type: LOG_OUT_FAILURE,
      }
    )

    expect(result).toStrictEqual({})
  })

  it('should handle REMOVE_TOKEN', () => {
    const result = tokenReducer(
      {
        access: 'accessToken',
        refresh: 'refreshToken',
      },
      {
        type: REMOVE_TOKEN,
      }
    )

    expect(result).toStrictEqual({})
  })
})
