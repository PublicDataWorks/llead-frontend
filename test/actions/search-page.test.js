import sinon from 'sinon'
import { CancelToken } from 'axios'

import {
  search,
  changeSearchQuery,
  saveSearchQuery,
  fetchSearchQueries,
} from 'actions/search-page'
import * as actionTypes from 'action-types/search-page'
import * as ServiceApi from 'utils/api'
import { SEARCH_API_URL, RECENT_QUERIES_API_URL } from 'constants/api'

describe('#search', () => {
  let cancel

  beforeEach(function () {
    cancel = sinon.spy()
    sinon.stub(CancelToken, 'source').returns({
      token: 'token',
      cancel,
    })
  })

  it('calls get Api', () => {
    const getStub = sinon.stub(ServiceApi, 'get')
    const getFunc = sinon.stub()
    getStub.returns(getFunc)

    search({query: 'keyword', docType: 'docType', limit: 1, offset: 1})

    expect(getStub).toHaveBeenCalledWith(
      [
        actionTypes.SEARCH_START,
        actionTypes.SEARCH_SUCCESS,
        actionTypes.SEARCH_FAILURE,
      ],
      SEARCH_API_URL
    )
    expect(getFunc).toHaveBeenCalledWith({ q: 'keyword', limit: 1, offset: 1, doc_type: 'docType' })
  })

  it('cancels old request if new request is called', () => {
    search({query: 'keyword', docType: 'docType', limit: 1, offset: 1})
    search({query: 'keywords', docType: 'docType', limit: 1, offset: 0})
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

describe('#saveSearchQuery', () => {
  it('calls post Api', () => {
    const postStub = sinon.stub(ServiceApi, 'post')
    const postFuncStub = sinon.stub()
    postStub.returns(postFuncStub)

    const query = {
      q: 'DOCUMENT',
    }

    saveSearchQuery('DOCUMENT')
    expect(postStub).toHaveBeenCalledWith(
      [
        actionTypes.SAVE_SEARCH_QUERY_START,
        actionTypes.SAVE_SEARCH_QUERY_SUCCESS,
        actionTypes.SAVE_SEARCH_QUERY_FAILURE,
      ],
      RECENT_QUERIES_API_URL
    )

    expect(postFuncStub).toHaveBeenCalledWith(query)
  })
})

describe('#fetchSearchQueries', () => {
  it('calls get Api', () => {
    const getStub = sinon.stub(ServiceApi, 'get')
    const getFunc = sinon.stub()
    getStub.returns(getFunc)

    fetchSearchQueries()

    expect(getStub).toHaveBeenCalledWith(
      [
        actionTypes.SEARCH_QUERIES_FETCH_START,
        actionTypes.SEARCH_QUERIES_FETCH_SUCCESS,
        actionTypes.SEARCH_QUERIES_FETCH_FAILURE,
      ],
      RECENT_QUERIES_API_URL
    )
    expect(getFunc).toHaveBeenCalled()
  })
})
