import { createAction } from 'redux-actions'

import * as actionTypes from 'action-types/officer-page'
import { download, get } from 'utils/api'
import { OFFICERS_API_URL } from 'constants/api'
import { CONTENT_TYPES } from 'constants/common'

export const fetchOfficer = (id) =>
  get(
    [
      actionTypes.OFFICER_FETCH_START,
      actionTypes.OFFICER_FETCH_SUCCESS,
      actionTypes.OFFICER_FETCH_FAILURE,
    ],
    `${OFFICERS_API_URL}${id}/`
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

export const changeFilterGroupKey = createAction(
  actionTypes.CHANGE_FILTER_GROUP_KEY
)

export const downloadOfficerTimeline = (id, fileName) =>
  download(
    [
      actionTypes.OFFICER_TIMELINE_DOWNLOAD_START,
      actionTypes.OFFICER_TIMELINE_DOWNLOAD_SUCCESS,
      actionTypes.OFFICER_TIMELINE_DOWNLOAD_FAILURE,
    ],
    `${OFFICERS_API_URL}${id}/download-xlsx/`
  )({ fileName, fileType: CONTENT_TYPES.SHEET })
