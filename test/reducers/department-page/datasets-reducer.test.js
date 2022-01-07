import datasetsReducer from 'reducers/department-page/datasets-reducer'

import {
  DEPARTMENT_DATASETS_FETCH_START,
  DEPARTMENT_DATASETS_FETCH_SUCCESS,
} from 'action-types/department-page'

describe('#datasetsReducer', () => {
  it('returns initial state', () => {
    expect(datasetsReducer(undefined, {})).toStrictEqual([])
  })

  it('handles DEPARTMENT_DATASETS_FETCH_START', () => {
    const result = datasetsReducer(
      { id: 1 },
      {
        type: DEPARTMENT_DATASETS_FETCH_START,
      }
    )

    expect(result).toStrictEqual([])
  })

  it('handles DEPARTMENT_DATASETS_FETCH_SUCCESS', () => {
    const datasetsData = { id: 1, name: 'Dataset name' }

    const result = datasetsReducer(
      {},
      {
        type: DEPARTMENT_DATASETS_FETCH_SUCCESS,
        payload: datasetsData,
      }
    )

    expect(result).toStrictEqual(datasetsData)
  })
})
