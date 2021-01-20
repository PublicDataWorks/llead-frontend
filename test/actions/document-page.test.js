import sinon from 'sinon'

import { fetchDocument } from 'actions/document-page'
import * as actionTypes from 'action-types/document-page'
import * as ServiceApi from 'utils/api'
import { DOCUMENT_API_URL } from 'constants/api'

describe('#fetchDocument', () => {
  it('calls get Api', () => {
    const getStub = sinon.stub(ServiceApi, 'get')
    const getFunc = sinon.stub()
    getStub.returns(getFunc)

    fetchDocument(1)

    expect(getStub).toHaveBeenCalledWith(
      [
        actionTypes.DOCUMENT_FETCH_START,
        actionTypes.DOCUMENT_FETCH_SUCCESS,
        actionTypes.DOCUMENT_FETCH_FAILURE,
      ],
      `${DOCUMENT_API_URL}1/`
    )
    expect(getFunc).toHaveBeenCalled()
  })
})
