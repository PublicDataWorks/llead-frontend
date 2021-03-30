import documentsReducer from 'reducers/officer-page/documents-reducer'

import {
  OFFICER_DOCUMENTS_FETCH_START,
  OFFICER_DOCUMENTS_FETCH_SUCCESS,
} from 'action-types/officer-page'

describe('#documentsReducer', () => {
  it('should return initial state', () => {
    expect(documentsReducer(undefined, {})).toStrictEqual([])
  })

  it('should handle OFFICER_DOCUMENTS_FETCH_START', () => {
    const result = documentsReducer([], {
      type: OFFICER_DOCUMENTS_FETCH_START,
    })

    expect(result).toStrictEqual([])
  })

  it('should handle OFFICER_DOCUMENTS_FETCH_SUCCESS', () => {
    const documentsData = ['document 1', 'document 2']

    const result = documentsReducer(
      {},
      {
        type: OFFICER_DOCUMENTS_FETCH_SUCCESS,
        payload: documentsData,
      }
    )

    expect(result).toStrictEqual(documentsData)
  })
})
