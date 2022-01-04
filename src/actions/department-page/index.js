import { CancelToken } from 'axios'

import * as actionTypes from 'action-types/department-page'
import { get } from 'utils/api'
import { DEPARTMENTS_API_URL } from 'constants/api'
import { REQUEST_CANCEL_MESSAGE } from 'constants/common'

let cancelTokenSource
const cancelOldRequest = (newRequest) => (...args) => {
  if (cancelTokenSource) {
    cancelTokenSource.cancel(REQUEST_CANCEL_MESSAGE)
  }
  cancelTokenSource = CancelToken.source()
  return newRequest(...args)
}

export const fetchDepartment = (id) =>
  get(
    [
      actionTypes.DEPARTMENT_FETCH_START,
      actionTypes.DEPARTMENT_FETCH_SUCCESS,
      actionTypes.DEPARTMENT_FETCH_FAILURE,
    ],
    `${DEPARTMENTS_API_URL}${id}/`
  )()

export const fetchFeaturedOfficers = (id) =>
  get(
    [
      actionTypes.DEPARTMENT_FEATURED_OFFICERS_FETCH_START,
      actionTypes.DEPARTMENT_FEATURED_OFFICERS_FETCH_SUCCESS,
      actionTypes.DEPARTMENT_FEATURED_OFFICERS_FETCH_FAILURE,
    ],
    `${DEPARTMENTS_API_URL}${id}/officers/`
  )()

export const fetchDocuments = cancelOldRequest((id, params) =>
  get(
    [
      actionTypes.DEPARTMENT_DOCUMENTS_FETCH_START,
      actionTypes.DEPARTMENT_DOCUMENTS_FETCH_SUCCESS,
      actionTypes.DEPARTMENT_DOCUMENTS_FETCH_FAILURE,
    ],
    `${DEPARTMENTS_API_URL}${id}/documents/`,
    cancelTokenSource.token
  )(params)
)
