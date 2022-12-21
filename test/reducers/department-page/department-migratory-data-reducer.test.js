import departmentMigratoryDataReducer from 'reducers/department-page/department-migratory-data-reducer'

import { DEPARTMENT_MIGRATORY_DATA_FETCH_SUCCESS } from 'action-types/department-page'

describe('#departmentMigratoryDataReducer', () => {
  it('returns initial state', () => {
    expect(departmentMigratoryDataReducer(undefined, {})).toStrictEqual({})
  })

  it('handles DEPARTMENT_MIGRATORY_DATA_FETCH_SUCCESS', () => {
    const data = { id: 1, name: 'Migratory' }

    const result = departmentMigratoryDataReducer(
      {},
      {
        type: DEPARTMENT_MIGRATORY_DATA_FETCH_SUCCESS,
        payload: data,
      }
    )

    expect(result).toStrictEqual(data)
  })
})
