import sinon from 'sinon'

import {
  clearDepartmentSearchResults,
  fetchDatasets,
  fetchDepartment,
  fetchFeaturedDocuments,
  fetchFeaturedNewsArticles,
  fetchFeaturedOfficers,
  fetchSearchItems,
  fetchDepartmentMigratoryData,
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

describe('#fetchSearchItems', () => {
  it('calls get Api with no params', () => {
    const getStub = sinon.stub(ServiceApi, 'get')
    const getFunc = sinon.stub()
    getStub.returns(getFunc)

    fetchSearchItems(1)

    expect(getStub).toHaveBeenCalledWith(
      [
        actionTypes.SEARCH_ITEMS_START,
        actionTypes.SEARCH_ITEMS_SUCCESS,
        actionTypes.SEARCH_ITEMS_FAILURE,
      ],
      `${DEPARTMENTS_API_URL}1/search/`
    )
    expect(getFunc).toHaveBeenCalledWith(undefined)
  })

  it('calls get Api with params', () => {
    const getStub = sinon.stub(ServiceApi, 'get')
    const getFunc = sinon.stub()
    getStub.returns(getFunc)

    const params = {
      key: 'value',
    }

    fetchSearchItems(1, params)

    expect(getStub).toHaveBeenCalledWith(
      [
        actionTypes.SEARCH_ITEMS_START,
        actionTypes.SEARCH_ITEMS_SUCCESS,
        actionTypes.SEARCH_ITEMS_FAILURE,
      ],
      `${DEPARTMENTS_API_URL}1/search/`
    )
    expect(getFunc).toHaveBeenCalledWith(params)
  })
})

describe('#clearDepartmentSearchResults', () => {
  it('returns the clear search results action', () => {
    expect(clearDepartmentSearchResults()).toEqual({
      type: actionTypes.CLEAR_DEPARTMENT_SEARCH_RESULTS,
    })
  })
})

describe('#fetchDepartmentMigratoryData', () => {
  it('calls get Api', () => {
    const getStub = sinon.stub(ServiceApi, 'get')
    const getFunc = sinon.stub()
    getStub.returns(getFunc)

    fetchDepartmentMigratoryData(1)

    expect(getStub).toHaveBeenCalledWith(
      [
        actionTypes.DEPARTMENT_MIGRATORY_DATA_FETCH_START,
        actionTypes.DEPARTMENT_MIGRATORY_DATA_FETCH_SUCCESS,
        actionTypes.DEPARTMENT_MIGRATORY_DATA_FETCH_FAILURE,
      ],
      `${DEPARTMENTS_API_URL}1/migratory-by-department/`
    )
    expect(getFunc).toHaveBeenCalled()
  })
})
