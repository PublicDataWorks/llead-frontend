import * as actionTypes from 'action-types/department-page'
import { get } from 'utils/api'
import { DEPARTMENTS_API_URL } from 'constants/api'

export const fetchDepartment = (id) =>
  get(
    [
      actionTypes.DEPARTMENT_FETCH_START,
      actionTypes.DEPARTMENT_FETCH_SUCCESS,
      actionTypes.DEPARTMENT_FETCH_FAILURE,
    ],
    `${DEPARTMENTS_API_URL}${id}/`
  )()

export const fetchDocuments = (id, params) =>
  get(
    [
      actionTypes.DEPARTMENT_DOCUMENTS_FETCH_START,
      actionTypes.DEPARTMENT_DOCUMENTS_FETCH_SUCCESS,
      actionTypes.DEPARTMENT_DOCUMENTS_FETCH_FAILURE,
    ],
    `${DEPARTMENTS_API_URL}${id}/documents/`
  )(params)