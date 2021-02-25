import previousLocationReducer from 'reducers/login-page/previous-location-reducer'

import { SET_PREVIOUS_LOCATION } from 'action-types/common/private-route'

describe('#previousLocationReducer', () => {
  it('should return initial state', () => {
    expect(previousLocationReducer(undefined, {})).toEqual(null)
  })

  it('should handle SET_PREVIOUS_LOCATION', () => {
    const previousLocation = {
      pathname: '/departments/1/'
    }
    const result = previousLocationReducer(null, {
      type: SET_PREVIOUS_LOCATION,
      payload: previousLocation,
    })

    expect(result).toEqual(previousLocation)
  })
})
