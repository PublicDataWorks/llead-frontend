import sinon from 'sinon'

import { search, changeSearchQuery } from 'actions/search-page'
import * as actionTypes from 'action-types/search-page'
import * as ServiceApi from 'utils/api'
import { SEARCH_API_URL } from 'constants/api'

describe('#search', () => {
  it('calls get Api', () => {
    const getStub = sinon.stub(ServiceApi, 'get')
    const getFunc = sinon.stub()
    getStub.returns(getFunc)

    search()

    expect(getStub).toHaveBeenCalledWith(
      [
        actionTypes.SEARCH_START,
        actionTypes.SEARCH_SUCCESS,
        actionTypes.SEARCH_FAILURE,
      ],
      SEARCH_API_URL
    )
    expect(getFunc).toHaveBeenCalled()
  })
})

describe('#search', () => {
  it('returns the right action', () => {
    const query = 'query'

    expect(changeSearchQuery(query)).toEqual({
      type: actionTypes.CHANGE_SEARCH_QUERY,
      payload: query,
    })
  })
})
