import isOfficerRequestingReducer from 'reducers/officer-page/is-requesting-reducer'

import {
  OFFICER_FETCH_START,
  OFFICER_FETCH_SUCCESS,
  OFFICER_FETCH_FAILURE,
} from 'action-types/officer-page'

describe('#isRequestingReducer', () => {
  it('should return initial state', () => {
    expect(isOfficerRequestingReducer(undefined, {})).toEqual(false)
  })

  it('should handle OFFICER_FETCH_START', () => {
    const result = isOfficerRequestingReducer(null, {
      type: OFFICER_FETCH_START,
    })

    expect(result).toEqual(true)
  })

  it('should handle OFFICER_FETCH_SUCCESS', () => {
    const result = isOfficerRequestingReducer(null, {
      type: OFFICER_FETCH_SUCCESS,
    })

    expect(result).toEqual(false)
  })

  it('should handle OFFICER_FETCH_FAILURE', () => {
    const result = isOfficerRequestingReducer(null, {
      type: OFFICER_FETCH_FAILURE,
    })

    expect(result).toEqual(false)
  })
})
