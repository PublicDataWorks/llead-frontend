import featuredDocumentsReducer from 'reducers/department-page/featured-documents-reducer'

import {
  DEPARTMENT_FEATURED_DOCUMENTS_FETCH_START,
  DEPARTMENT_FEATURED_DOCUMENTS_FETCH_SUCCESS,
} from 'action-types/department-page'

describe('#featuredDocumentsReducer', () => {
  it('returns initial state', () => {
    expect(featuredDocumentsReducer(undefined, {})).toStrictEqual([])
  })

  it('handles DEPARTMENT_FEATURED_DOCUMENTS_FETCH_START', () => {
    const result = featuredDocumentsReducer(
      { id: 1 },
      {
        type: DEPARTMENT_FEATURED_DOCUMENTS_FETCH_START,
      }
    )

    expect(result).toStrictEqual([])
  })

  it('handles DEPARTMENT_FEATURED_DOCUMENTS_FETCH_SUCCESS', () => {
    const featuredDocumentsData = { id: 1, title: 'Document title' }

    const result = featuredDocumentsReducer(
      {},
      {
        type: DEPARTMENT_FEATURED_DOCUMENTS_FETCH_SUCCESS,
        payload: featuredDocumentsData,
      }
    )

    expect(result).toStrictEqual(featuredDocumentsData)
  })
})
