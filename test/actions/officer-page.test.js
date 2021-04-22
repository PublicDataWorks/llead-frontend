import sinon from 'sinon'

import {
  fetchOfficer,
  fetchOfficerTimeline,
  changeFilterGroupKey,
} from 'actions/officer-page'
import * as actionTypes from 'action-types/officer-page'
import * as ServiceApi from 'utils/api'
import { OFFICERS_API_URL } from 'constants/api'

describe('#fetchOfficer', () => {
  it('calls get Api', () => {
    const getStub = sinon.stub(ServiceApi, 'get')
    const getFunc = sinon.stub()
    getStub.returns(getFunc)

    fetchOfficer(1)

    expect(getStub).toHaveBeenCalledWith(
      [
        actionTypes.OFFICER_FETCH_START,
        actionTypes.OFFICER_FETCH_SUCCESS,
        actionTypes.OFFICER_FETCH_FAILURE,
      ],
      `${OFFICERS_API_URL}1/`
    )
    expect(getFunc).toHaveBeenCalled()
  })
})

describe('#fetchOfficerTimeline', () => {
  it('calls get Api', () => {
    const getStub = sinon.stub(ServiceApi, 'get')
    const getFunc = sinon.stub()
    getStub.returns(getFunc)

    fetchOfficerTimeline(1)

    expect(getStub).toHaveBeenCalledWith(
      [
        actionTypes.OFFICER_TIMELINE_FETCH_START,
        actionTypes.OFFICER_TIMELINE_FETCH_SUCCESS,
        actionTypes.OFFICER_TIMELINE_FETCH_FAILURE,
      ],
      `${OFFICERS_API_URL}1/timeline/`
    )
    expect(getFunc).toHaveBeenCalled()
  })
})

describe('#changeFilterGroupKey', () => {
  it('returns the right action', () => {
    const filterGroupKey = 'group keuy'

    expect(changeFilterGroupKey(filterGroupKey)).toEqual({
      type: actionTypes.CHANGE_FILTER_GROUP_KEY,
      payload: filterGroupKey,
    })
  })
})
