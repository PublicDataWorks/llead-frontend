import searchDepartmentReducer from 'reducers/search-page/search-department-reducer'

import { CHANGE_SEARCH_DEPARTMENT } from 'action-types/search-page'

describe('#searchDepartmentReducer', () => {
  it('returns initial state', () => {
    expect(searchDepartmentReducer(undefined, {})).toStrictEqual({})
  })

  it('changes search department', () => {
    const searchDepartment = 'dummy-department'

    const result = searchDepartmentReducer(
      {},
      {
        type: CHANGE_SEARCH_DEPARTMENT,
        payload: searchDepartment,
      }
    )

    expect(result).toStrictEqual(searchDepartment)
  })
})
