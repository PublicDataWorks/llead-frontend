import { handleActions } from 'redux-actions'

import {
  SEARCH_FAILURE,
  SEARCH_START,
  SEARCH_SUCCESS,
} from 'action-types/common/search-feature'

export default handleActions(
  {
    [SEARCH_START]: () => true,
    [SEARCH_SUCCESS]: () => false,
    [SEARCH_FAILURE]: () => false,
  },
  false
)
