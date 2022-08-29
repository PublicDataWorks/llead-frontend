import { setPreviousLocation } from 'actions/common/private-route'
import * as actionTypes from 'action-types/common/private-route'

describe('#setPreviousLocation', () => {
  it('returns the right action', () => {
    const location = {
      pathname: '/departments/1/',
    }

    expect(setPreviousLocation(location)).toEqual({
      type: actionTypes.SET_PREVIOUS_LOCATION,
      payload: location,
    })
  })
})
