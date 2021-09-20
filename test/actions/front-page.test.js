import sinon from 'sinon'

import {
  fetchAnalyticSummary,
  fetchDepartments,
  fetchOfficers,
  fetchDocuments,
  fetchNewsArticles,
  fetchFrontPageOrders,
} from 'actions/front-page'
import * as actionTypes from 'action-types/front-page'
import * as ServiceApi from 'utils/api'
import {
  ANALYTIC_SUMMARY_API_URL,
  DEPARTMENTS_API_URL,
  OFFICERS_API_URL,
  DOCUMENTS_API_URL,
  NEWS_ARTICLES_API_URL,
  FRONT_PAGE_ORDERS_API_URL,
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

describe('#fetchNewsArticles', () => {
  it('calls get Api', () => {
    const getStub = sinon.stub(ServiceApi, 'get')
    const getFunc = sinon.stub()
    getStub.returns(getFunc)

    fetchNewsArticles()

    expect(getStub).toHaveBeenCalledWith(
      [
        actionTypes.NEWS_ARTICLES_FETCH_START,
        actionTypes.NEWS_ARTICLES_FETCH_SUCCESS,
        actionTypes.NEWS_ARTICLES_FETCH_FAILURE,
      ],
      NEWS_ARTICLES_API_URL
    )
    expect(getFunc).toHaveBeenCalled()
  })
})

describe('#fetchFrontPageOrders', () => {
  it('calls get Api', () => {
    const getStub = sinon.stub(ServiceApi, 'get')
    const getFunc = sinon.stub()
    getStub.returns(getFunc)

    fetchFrontPageOrders()

    expect(getStub).toHaveBeenCalledWith(
      [
        actionTypes.FRONT_PAGE_ORDERS_FETCH_START,
        actionTypes.FRONT_PAGE_ORDERS_FETCH_SUCCESS,
        actionTypes.FRONT_PAGE_ORDERS_FETCH_FAILURE,
      ],
      FRONT_PAGE_ORDERS_API_URL
    )
    expect(getFunc).toHaveBeenCalled()
  })
})
