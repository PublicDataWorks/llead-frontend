import {
  clearDocumentHead,
  setDocumentHead,
} from 'actions/common/document-head'
import * as actionTypes from 'action-types/common/document-head'

describe('#setDocumentHead', () => {
  it('returns the right action', () => {
    const documentDead = {
      title: 'title',
    }

    expect(setDocumentHead(documentDead)).toEqual({
      type: actionTypes.SET_DOCUMENT_HEAD,
      payload: documentDead,
    })
  })
})

describe('#clearDocumentHead', () => {
  it('returns the right action', () => {
    expect(clearDocumentHead()).toEqual({
      type: actionTypes.CLEAR_DOCUMENT_HEAD,
    })
  })
})
