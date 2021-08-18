import { handleActions } from 'redux-actions'

import {
  OFFICER_TIMELINE_DOWNLOAD_START,
  OFFICER_TIMELINE_DOWNLOAD_FAILURE,
  OFFICER_TIMELINE_DOWNLOAD_SUCCESS,
} from 'action-types/officer-page'

export default handleActions(
  {
    [OFFICER_TIMELINE_DOWNLOAD_START]: () => true,
    [OFFICER_TIMELINE_DOWNLOAD_SUCCESS]: () => false,
    [OFFICER_TIMELINE_DOWNLOAD_FAILURE]: () => false,
  },
  false
)
