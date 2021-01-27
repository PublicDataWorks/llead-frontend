import { updateToken, logOut } from 'actions/authentication'
import * as actionTypes from 'action-types/authentication'

describe('#updateToken', () => {
  it('returns the right action', () => {
    const token = 'token'

    expect(updateToken(token)).toEqual({
      type: actionTypes.UPDATE_TOKEN,
      payload: token,
    })
  })
})

describe('#logOut', () => {
  it('returns the right action', () => {
    expect(logOut()).toEqual({
      type: actionTypes.LOG_OUT,
      payload: undefined,
    })
  })
})
