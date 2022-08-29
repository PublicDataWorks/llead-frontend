import { handleActions } from 'redux-actions'
import reduce from 'lodash/reduce'
import compact from 'lodash/compact'
import get from 'lodash/get'

import {
  SEARCH_ALL_SUCCESS,
  CHANGE_SEARCH_QUERY,
  FLUSH_SEARCH,
} from 'action-types/common/search-feature'
import unionBy from 'lodash/unionBy'

export default handleActions(
  {
    [CHANGE_SEARCH_QUERY]: () => ({}),
    [FLUSH_SEARCH]: () => ({}),
    [SEARCH_ALL_SUCCESS]: (state, action) => {
      const value = reduce(
        action.payload,
        (acc, value, docType) => ({
          ...acc,
          [docType]: {
            ...value,
            results: compact(
              unionBy(get(state, `${docType}.results`), value.results, 'id')
            ),
          },
        }),
        {}
      )
      return value
    },
  },
  {}
)
