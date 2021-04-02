import * as actionTypes from 'action-types/officer-page'
import { get } from 'utils/api'
import { OFFICERS_API_URL } from 'constants/api'

export const fetchOfficer = (id) =>
  get(
    [
      actionTypes.OFFICER_FETCH_START,
      actionTypes.OFFICER_FETCH_SUCCESS,
      actionTypes.OFFICER_FETCH_FAILURE,
    ],
    `${OFFICERS_API_URL}${id}/`
  )()

export const fetchOfficerDocuments = (id) =>
  get(
    [
      actionTypes.OFFICER_DOCUMENTS_FETCH_START,
      actionTypes.OFFICER_DOCUMENTS_FETCH_SUCCESS,
      actionTypes.OFFICER_DOCUMENTS_FETCH_FAILURE,
    ],
    `${OFFICERS_API_URL}${id}/documents/`
  )()

export const fetchOfficerTimeline = (id) =>
  get(
    [
      actionTypes.OFFICER_TIMELINE_FETCH_START,
      actionTypes.OFFICER_TIMELINE_FETCH_SUCCESS,
      actionTypes.OFFICER_TIMELINE_FETCH_FAILURE,
    ],
    `${OFFICERS_API_URL}${id}/timeline/`
  )()
