import departmentReducer from 'reducers/department-page/department-reducer'

import {
  DEPARTMENT_FETCH_START,
  DEPARTMENT_FETCH_SUCCESS,
} from 'action-types/department-page'

describe('#departmentReducer', () => {
  it('should return initial state', () => {
    expect(departmentReducer(undefined, {})).toStrictEqual({})
  })

  it('should handle DEPARTMENT_FETCH_START', () => {
    const result = departmentReducer({ id: 1 }, {
      type: DEPARTMENT_FETCH_START,
    })

    expect(result).toStrictEqual({})
  })

  it('should handle DEPARTMENT_FETCH_SUCCESS', () => {
    const departmentData = { id: 1, name: 'Department name' }

    const result = departmentReducer(
      {},
      {
        type: DEPARTMENT_FETCH_SUCCESS,
        payload: departmentData,
      }
    )

    expect(result).toStrictEqual(departmentData)
  })
})
