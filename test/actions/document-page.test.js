import sinon from 'sinon'

import { fetchDocument } from 'actions/document-page'
import * as actionTypes from 'action-types/document-page'
import * as ServiceApi from 'utils/api'

describe('#fetchDocument', () => {
  it('calls get Api', () => {
    const getStub = sinon.stub(ServiceApi, 'get')
    const getFunc = sinon.stub()
    getStub.returns(getFunc)

    fetchDocument(1)

    expect(getStub).toHaveBeenCalledWith(
      [
        actionTypes.FETCH_DOCUMENT_START,
        actionTypes.FETCH_DOCUMENT_SUCCESS,
        actionTypes.FETCH_DOCUMENT_FAILURE,
      ],
      'http://localhost:8000/api/documents/1'
    )
    expect(getFunc).toHaveBeenCalled()
  })
})
