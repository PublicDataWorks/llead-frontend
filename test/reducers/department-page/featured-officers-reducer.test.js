import featuredOfficersReducer from 'reducers/department-page/featured-officers-reducer'

import {
  DEPARTMENT_FEATURED_OFFICERS_FETCH_START,
  DEPARTMENT_FEATURED_OFFICERS_FETCH_SUCCESS,
} from 'action-types/department-page'

describe('#featuredOfficersReducer', () => {
  it('returns initial state', () => {
    expect(featuredOfficersReducer(undefined, {})).toStrictEqual([])
  })

  it('handles DEPARTMENT_FEATURED_OFFICERS_FETCH_START', () => {
    const result = featuredOfficersReducer(
      { id: 1 },
      {
        type: DEPARTMENT_FEATURED_OFFICERS_FETCH_START,
      }
    )

    expect(result).toStrictEqual([])
  })

  it('handles DEPARTMENT_FEATURED_OFFICERS_FETCH_SUCCESS', () => {
    const featuredOfficersData = { id: 1, name: 'Officer name' }

    const result = featuredOfficersReducer(
      {},
      {
        type: DEPARTMENT_FEATURED_OFFICERS_FETCH_SUCCESS,
        payload: featuredOfficersData,
      }
    )

    expect(result).toStrictEqual(featuredOfficersData)
  })
})
