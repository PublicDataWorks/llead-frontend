import isRequestingReducer from 'reducers/department-page/is-requesting-reducer'

import {
  DEPARTMENT_FETCH_START,
  DEPARTMENT_FETCH_SUCCESS,
  DEPARTMENT_FETCH_FAILURE,
} from 'action-types/department-page'

describe('#isRequestingReducer', () => {
  it('should return initial state', () => {
    expect(isRequestingReducer(undefined, {})).toEqual(false)
  })

  it('should handle DEPARTMENT_FETCH_START', () => {
    const result = isRequestingReducer(null, {
      type: DEPARTMENT_FETCH_START,
    })

    expect(result).toEqual(true)
  })

  it('should handle DEPARTMENT_FETCH_SUCCESS', () => {
    const result = isRequestingReducer(null, {
      type: DEPARTMENT_FETCH_SUCCESS,
    })

    expect(result).toEqual(false)
  })

  it('should handle DEPARTMENT_FETCH_FAILURE', () => {
    const result = isRequestingReducer(null, {
      type: DEPARTMENT_FETCH_FAILURE,
    })

    expect(result).toEqual(false)
  })
})
