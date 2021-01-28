import departmentsReducer from 'reducers/front-page/departments-reducer'

import { DEPARTMENTS_FETCH_SUCCESS } from 'action-types/front-page'

describe('#departmentsReducer', () => {
  it('should return initial state', () => {
    expect(departmentsReducer(undefined, {})).toStrictEqual([])
  })

  it('should handle DEPARTMENTS_FETCH_SUCCESS', () => {
    const departments = [
      {
        id: 1,
        name: 'Baton Rouge Department',
        city: 'Baton Rouge',
        parish: 'East Baton Rouge',
        location_map_url: 'url',
      },
    ]

    const result = departmentsReducer(
      {},
      {
        type: DEPARTMENTS_FETCH_SUCCESS,
        payload: departments,
      }
    )

    expect(result).toStrictEqual(departments)
  })
})
