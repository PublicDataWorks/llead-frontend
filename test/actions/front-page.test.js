import sinon from 'sinon'

import {
  fetchAnalyticSummary,
  fetchRecentItems,
  fetchDepartments,
  fetchOfficers,
  fetchDocuments,
} from 'actions/front-page'
import * as actionTypes from 'action-types/front-page'
import * as ServiceApi from 'utils/api'
import {
  ANALYTIC_SUMMARY_API_URL,
  RECENT_ITEMS_API_URL,
  DEPARTMENTS_API_URL,
  OFFICERS_API_URL,
  DOCUMENTS_API_URL,
} from 'constants/api'

describe('#fetchAnalyticSummary', () => {
  it('calls get Api', () => {
    const getStub = sinon.stub(ServiceApi, 'get')
    const getFunc = sinon.stub()
    getStub.returns(getFunc)

    fetchAnalyticSummary()

    expect(getStub).toHaveBeenCalledWith(
      [
        actionTypes.ANALYTIC_SUMMARY_FETCH_START,
        actionTypes.ANALYTIC_SUMMARY_FETCH_SUCCESS,
        actionTypes.ANALYTIC_SUMMARY_FETCH_FAILURE,
      ],
      ANALYTIC_SUMMARY_API_URL
    )
    expect(getFunc).toHaveBeenCalled()
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

describe('#fetchDepartments', () => {
  it('calls get Api', () => {
    const getStub = sinon.stub(ServiceApi, 'get')
    const getFunc = sinon.stub()
    getStub.returns(getFunc)

    fetchDepartments()

    expect(getStub).toHaveBeenCalledWith(
      [
        actionTypes.DEPARTMENTS_FETCH_START,
        actionTypes.DEPARTMENTS_FETCH_SUCCESS,
        actionTypes.DEPARTMENTS_FETCH_FAILURE,
      ],
      DEPARTMENTS_API_URL
    )
    expect(getFunc).toHaveBeenCalled()
  })
})

describe('#fetchOfficers', () => {
  it('calls get Api', () => {
    const getStub = sinon.stub(ServiceApi, 'get')
    const getFunc = sinon.stub()
    getStub.returns(getFunc)

    fetchOfficers()

    expect(getStub).toHaveBeenCalledWith(
      [
        actionTypes.OFFICERS_FETCH_START,
        actionTypes.OFFICERS_FETCH_SUCCESS,
        actionTypes.OFFICERS_FETCH_FAILURE,
      ],
      OFFICERS_API_URL
    )
    expect(getFunc).toHaveBeenCalled()
  })
})

describe('#fetchDocuments', () => {
  it('calls get Api', () => {
    const getStub = sinon.stub(ServiceApi, 'get')
    const getFunc = sinon.stub()
    getStub.returns(getFunc)

    fetchDocuments()

    expect(getStub).toHaveBeenCalledWith(
      [
        actionTypes.DOCUMENTS_FETCH_START,
        actionTypes.DOCUMENTS_FETCH_SUCCESS,
        actionTypes.DOCUMENTS_FETCH_FAILURE,
      ],
      DOCUMENTS_API_URL
    )
    expect(getFunc).toHaveBeenCalled()
  })
})
