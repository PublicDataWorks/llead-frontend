import documentReducer from 'reducers/document-page/document-reducer'

import { DOCUMENT_FETCH_SUCCESS } from 'action-types/document-page'

describe('#documentReducer', () => {
  it('should return initial state', () => {
    expect(documentReducer(undefined, {})).toStrictEqual({})
  })

  it('should handle DOCUMENT_FETCH_SUCCESS', () => {
    const documentData = { id: 1, title: 'Document title' }

    const result = documentReducer(
      {},
      {
        type: DOCUMENT_FETCH_SUCCESS,
        payload: documentData,
      }
    )

    expect(result).toStrictEqual(documentData)
  })
})
