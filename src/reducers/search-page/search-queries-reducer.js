import uniq from 'lodash/uniq'
import slice from 'lodash/slice'
import { handleActions } from 'redux-actions'

import { SAVE_SEARCH_QUERY } from 'action-types/search-page'
import { MAX_SEARCH_QUERIES } from 'constants/common'

export default handleActions(
  {
    [SAVE_SEARCH_QUERY]: (state, action) =>
      slice(uniq([action.payload, ...state]), 0, MAX_SEARCH_QUERIES),
  },
  []
)
