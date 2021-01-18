import * as actionTypes from 'action-types/document-page'
import { get } from 'utils/api'
import { DOCUMENT_API_URL } from 'constants/api'

export const fetchDocument = (id) =>
  get(
    [
      actionTypes.FETCH_DOCUMENT_START,
      actionTypes.FETCH_DOCUMENT_SUCCESS,
      actionTypes.FETCH_DOCUMENT_FAILURE,
    ],
    `${DOCUMENT_API_URL}${id}`
  )()
