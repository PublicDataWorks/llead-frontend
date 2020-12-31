import sinon from 'sinon'

import { fetchDocument } from 'pages/document-page/services/actions'
import * as actionTypes from 'pages/document-page/services/action-types'
import * as ServiceApi from 'services/api'

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
      'documents/1'
    )
    expect(getFunc).toHaveBeenCalled()
  })
})
