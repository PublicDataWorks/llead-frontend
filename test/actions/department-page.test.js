import sinon from 'sinon'

import {
  fetchDatasets,
  fetchDepartment,
  fetchFeaturedDocuments,
  fetchFeaturedNewsArticles,
  fetchFeaturedOfficers,
} from 'actions/department-page'
import * as actionTypes from 'action-types/department-page'
import * as ServiceApi from 'utils/api'
import { DEPARTMENTS_API_URL } from 'constants/api'

describe('#fetchDepartment', () => {
  it('calls get Api', () => {
    const getStub = sinon.stub(ServiceApi, 'get')
    const getFunc = sinon.stub()
    getStub.returns(getFunc)

    fetchDepartment(1)

    expect(getStub).toHaveBeenCalledWith(
      [
        actionTypes.DEPARTMENT_FETCH_START,
        actionTypes.DEPARTMENT_FETCH_SUCCESS,
        actionTypes.DEPARTMENT_FETCH_FAILURE,
      ],
      `${DEPARTMENTS_API_URL}1/`
    )
    expect(getFunc).toHaveBeenCalled()
  })
})

describe('#fetchFeaturedOfficers', () => {
  it('calls get Api', () => {
    const getStub = sinon.stub(ServiceApi, 'get')
    const getFunc = sinon.stub()
    getStub.returns(getFunc)

    fetchFeaturedOfficers(1)

    expect(getStub).toHaveBeenCalledWith(
      [
        actionTypes.DEPARTMENT_FEATURED_OFFICERS_FETCH_START,
        actionTypes.DEPARTMENT_FEATURED_OFFICERS_FETCH_SUCCESS,
        actionTypes.DEPARTMENT_FEATURED_OFFICERS_FETCH_FAILURE,
      ],
      `${DEPARTMENTS_API_URL}1/officers/`
    )
    expect(getFunc).toHaveBeenCalled()
  })
})

describe('#fetchFeaturedDocuments', () => {
  it('calls get Api', () => {
    const getStub = sinon.stub(ServiceApi, 'get')
    const getFunc = sinon.stub()
    getStub.returns(getFunc)

    fetchFeaturedDocuments(1)

    expect(getStub).toHaveBeenCalledWith(
      [
        actionTypes.DEPARTMENT_FEATURED_DOCUMENTS_FETCH_START,
        actionTypes.DEPARTMENT_FEATURED_DOCUMENTS_FETCH_SUCCESS,
        actionTypes.DEPARTMENT_FEATURED_DOCUMENTS_FETCH_FAILURE,
      ],
      `${DEPARTMENTS_API_URL}1/documents/`
    )
    expect(getFunc).toHaveBeenCalled()
  })
})

describe('#fetchFeaturedNewsArticles', () => {
  it('calls get Api', () => {
    const getStub = sinon.stub(ServiceApi, 'get')
    const getFunc = sinon.stub()
    getStub.returns(getFunc)

    fetchFeaturedNewsArticles(1)

    expect(getStub).toHaveBeenCalledWith(
      [
        actionTypes.DEPARTMENT_FEATURED_NEWS_ARTICLES_FETCH_START,
        actionTypes.DEPARTMENT_FEATURED_NEWS_ARTICLES_FETCH_SUCCESS,
        actionTypes.DEPARTMENT_FEATURED_NEWS_ARTICLES_FETCH_FAILURE,
      ],
      `${DEPARTMENTS_API_URL}1/news_articles/`
    )
    expect(getFunc).toHaveBeenCalled()
  })
})

describe('#fetchDatasets', () => {
  it('calls get Api', () => {
    const getStub = sinon.stub(ServiceApi, 'get')
    const getFunc = sinon.stub()
    getStub.returns(getFunc)

    fetchDatasets(1)

    expect(getStub).toHaveBeenCalledWith(
      [
        actionTypes.DEPARTMENT_DATASETS_FETCH_START,
        actionTypes.DEPARTMENT_DATASETS_FETCH_SUCCESS,
        actionTypes.DEPARTMENT_DATASETS_FETCH_FAILURE,
      ],
      `${DEPARTMENTS_API_URL}1/datasets/`
    )
    expect(getFunc).toHaveBeenCalled()
  })
})
