import { updateToken } from 'actions/authentication'
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
