import { handleActions } from 'redux-actions'

import {
  CHANGE_SEARCH_QUERY,
  FLUSH_SEARCH,
} from 'action-types/common/search-feature'

export default handleActions(
  {
    [FLUSH_SEARCH]: () => '',
    [CHANGE_SEARCH_QUERY]: (state, action) => action.payload,
  },
  ''
)
