import * as actionTypes from 'action-types/common/document-head'
import { createAction } from 'redux-actions'

export const setDocumentHead = createAction(actionTypes.SET_DOCUMENT_HEAD)

export const clearDocumentHead = createAction(actionTypes.CLEAR_DOCUMENT_HEAD)
