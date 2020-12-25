import * as actionTypes from './action-types'
import { get } from 'services/api'

export const fetchDocument = (id) =>
  get(
    [
      actionTypes.FETCH_DOCUMENT_START,
      actionTypes.FETCH_DOCUMENT_SUCCESS,
      actionTypes.FETCH_DOCUMENT_FAILURE,
    ],
    `documents/${id}`
  )()
