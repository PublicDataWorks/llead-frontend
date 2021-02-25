import sinon from 'sinon'
import { CancelToken } from 'axios'

import { search, changeSearchQuery } from 'actions/search-page'
import * as actionTypes from 'action-types/search-page'
import * as ServiceApi from 'utils/api'
import { SEARCH_API_URL } from 'constants/api'

describe('#search', () => {
  let cancel;

  beforeEach(function () {
    cancel = sinon.spy();
    sinon.stub(CancelToken, 'source').returns({
      token: 'token',
      cancel,
    })
  })

  it('calls get Api', () => {
    const getStub = sinon.stub(ServiceApi, 'get')
    const getFunc = sinon.stub()
    getStub.returns(getFunc)

    search('keyword')

    expect(getStub).toHaveBeenCalledWith(
      [
        actionTypes.SEARCH_START,
        actionTypes.SEARCH_SUCCESS,
        actionTypes.SEARCH_FAILURE,
      ],
      SEARCH_API_URL
    )
    expect(getFunc).toHaveBeenCalledWith({ q: 'keyword' })
  })

  it('cancels old request if new request is called', () => {
    search('keyword');
    search('keywords');
    expect(cancel).toHaveBeenCalled()
  })
})

describe('#changeSearchQuery', () => {
  it('returns the right action', () => {
    const query = 'query'

    expect(changeSearchQuery(query)).toEqual({
      type: actionTypes.CHANGE_SEARCH_QUERY,
      payload: query,
    })
  })
})