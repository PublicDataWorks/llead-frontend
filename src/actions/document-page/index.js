import * as actionTypes from 'action-types/document-page'
import { get } from 'utils/api'
import { DOCUMENT_API_URL } from 'constants/api'

export const fetchDocument = (id) =>
  get(
    [
      actionTypes.DOCUMENT_FETCH_START,
      actionTypes.DOCUMENT_FETCH_SUCCESS,
      actionTypes.DOCUMENT_FETCH_FAILURE,
    ],
    `${DOCUMENT_API_URL}${id}/`
  )()
