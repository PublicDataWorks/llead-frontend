import { handleActions } from 'redux-actions'

import {
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_ALL_START,
  SEARCH_ALL_SUCCESS,
} from 'action-types/common/search-feature'

export default handleActions(
  {
    [SEARCH_START]: () => true,
    [SEARCH_ALL_START]: () => true,
    [SEARCH_SUCCESS]: () => false,
    [SEARCH_ALL_SUCCESS]: () => false,
  },
  false
)
