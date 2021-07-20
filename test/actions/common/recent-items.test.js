import sinon from 'sinon'

import * as actionTypes from 'action-types/common/recent-items'
import * as ServiceApi from 'utils/api'
import { fetchRecentItems, saveRecentItem } from 'actions/common/recent-items'
import { RECENT_ITEMS_API_URL } from 'constants/api'

describe('#saveRecentItem', () => {
  it('calls post Api', () => {
    const postStub = sinon.stub(ServiceApi, 'post')
    const postFuncStub = sinon.stub()
    postStub.returns(postFuncStub)

    const recentItem = {
      type: 'DOCUMENT',
      id: '131',
    }

    saveRecentItem(recentItem)
    expect(postStub).toHaveBeenCalledWith(
      [
        actionTypes.SAVE_RECENT_ITEM_START,
        actionTypes.SAVE_RECENT_ITEM_SUCCESS,
        actionTypes.SAVE_RECENT_ITEM_FAILURE,
      ],
      RECENT_ITEMS_API_URL
    )

    expect(postFuncStub).toHaveBeenCalledWith(recentItem)
  })
})

describe('#fetchRecentItems', () => {
  it('calls get Api', () => {
    const getStub = sinon.stub(ServiceApi, 'get')
    const getFunc = sinon.stub()
    getStub.returns(getFunc)

    fetchRecentItems()

    expect(getStub).toHaveBeenCalledWith(
      [
        actionTypes.RECENT_ITEMS_FETCH_START,
        actionTypes.RECENT_ITEMS_FETCH_SUCCESS,
        actionTypes.RECENT_ITEMS_FETCH_FAILURE,
      ],
      RECENT_ITEMS_API_URL
    )
    expect(getFunc).toHaveBeenCalled()
  })
})
