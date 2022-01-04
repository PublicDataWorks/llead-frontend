import sinon from 'sinon'

import {
  fetchDepartment,
  fetchDocuments,
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

describe('#fetchDocuments', () => {
  it('calls get Api with no params', () => {
    const getStub = sinon.stub(ServiceApi, 'get')
    const getFunc = sinon.stub()
    getStub.returns(getFunc)

    fetchDocuments(1)

    expect(getStub).toHaveBeenCalledWith(
      [
        actionTypes.DEPARTMENT_DOCUMENTS_FETCH_START,
        actionTypes.DEPARTMENT_DOCUMENTS_FETCH_SUCCESS,
        actionTypes.DEPARTMENT_DOCUMENTS_FETCH_FAILURE,
      ],
      `${DEPARTMENTS_API_URL}1/documents/`
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

    fetchDocuments(1, params)

    expect(getStub).toHaveBeenCalledWith(
      [
        actionTypes.DEPARTMENT_DOCUMENTS_FETCH_START,
        actionTypes.DEPARTMENT_DOCUMENTS_FETCH_SUCCESS,
        actionTypes.DEPARTMENT_DOCUMENTS_FETCH_FAILURE,
      ],
      `${DEPARTMENTS_API_URL}1/documents/`
    )
    expect(getFunc).toHaveBeenCalledWith(params)
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
