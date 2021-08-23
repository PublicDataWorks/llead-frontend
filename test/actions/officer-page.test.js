import sinon from 'sinon'

import {
  fetchOfficer,
  fetchOfficerTimeline,
  downloadOfficerTimeline,
  changeFilterGroupKey,
  clearOfficer,
} from 'actions/officer-page'
import * as actionTypes from 'action-types/officer-page'
import * as ServiceApi from 'utils/api'
import { OFFICERS_API_URL } from 'constants/api'
import { CONTENT_TYPES } from 'constants/common'

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

describe('#downloadOfficerTimeline', () => {
  it('calls download Api', () => {
    const downloadStub = sinon.stub(ServiceApi, 'download')
    const downloadFunc = sinon.stub()
    downloadStub.returns(downloadFunc)

    downloadOfficerTimeline(1, 'officer-1.xlsx')

    expect(downloadStub).toHaveBeenCalledWith(
      [
        actionTypes.OFFICER_TIMELINE_DOWNLOAD_START,
        actionTypes.OFFICER_TIMELINE_DOWNLOAD_SUCCESS,
        actionTypes.OFFICER_TIMELINE_DOWNLOAD_FAILURE,
      ],
      `${OFFICERS_API_URL}1/download-xlsx/`
    )
    expect(downloadFunc).toHaveBeenCalled({
      fileName: 'officer-1.xlsx',
      fileType: CONTENT_TYPES.SHEET,
    })
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

describe('#clearOfficer', () => {
  it('returns the right action', () => {
    expect(clearOfficer()).toEqual({
      type: actionTypes.CLEAR_OFFICER,
    })
  })
})
