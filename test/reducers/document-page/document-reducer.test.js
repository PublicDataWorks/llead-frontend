import documentReducer from 'reducers/document-page/document-reducer'

import { FETCH_DOCUMENT_SUCCESS } from 'action-types/document-page'

describe('#documentReducer', () => {
  it('should return initial state', () => {
    expect(documentReducer(undefined, {})).toStrictEqual({})
  })

  it('should handle FETCH_DOCUMENT_SUCCESS', () => {
    const documentData = { id: 1, title: 'Document title' }

    const result = documentReducer(
      {},
      {
        type: FETCH_DOCUMENT_SUCCESS,
        payload: documentData,
      }
    )

    expect(result).toStrictEqual(documentData)
  })
})
