import officersReducer from 'reducers/front-page/officers-reducer'

import { OFFICERS_FETCH_SUCCESS } from 'action-types/front-page'

describe('#officersReducer', () => {
  it('should return initial state', () => {
    expect(officersReducer(undefined, {})).toStrictEqual([])
  })

  it('should handle OFFICERS_FETCH_SUCCESS', () => {
    const officers = [
      {
        id: 23,
        name: 'Mark Carlson',
        badges: ['12345', '567'],
        department: {
          id: 'north-paulaberg-department',
          name: 'North Paulaberg Department',
        },
      },
      {
        id: 22,
        name: 'Eric Patel',
        badges: ['12345'],
        department: {
          id: 'north-paulaberg-department',
          name: 'North Paulaberg Department',
        },
      },
    ]

    const result = officersReducer(
      {},
      {
        type: OFFICERS_FETCH_SUCCESS,
        payload: officers,
      }
    )

    expect(result).toStrictEqual(officers)
  })
})
