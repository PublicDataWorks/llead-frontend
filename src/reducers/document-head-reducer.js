import { handleActions } from 'redux-actions'
import merge from 'lodash/merge'

import {
  CLEAR_DOCUMENT_HEAD,
  SET_DOCUMENT_HEAD,
} from 'action-types/common/document-head'
import { DEFAULT_DOCUMENT_HEAD } from 'constants/common'

export default handleActions(
  {
    [SET_DOCUMENT_HEAD]: (state, action) => merge({}, state, action.payload),
    [CLEAR_DOCUMENT_HEAD]: () => DEFAULT_DOCUMENT_HEAD,
  },
  DEFAULT_DOCUMENT_HEAD
)
