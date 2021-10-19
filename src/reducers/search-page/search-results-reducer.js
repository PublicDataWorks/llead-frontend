import { handleActions } from 'redux-actions'
import reduce from 'lodash/reduce'
import compact from 'lodash/compact'
import concat from 'lodash/concat'
import get from 'lodash/get'

import {
  SEARCH_SUCCESS,
  CHANGE_SEARCH_QUERY,
  CLEAR_SEARCH_RESULTS,
} from 'action-types/search-page'

export default handleActions(
  {
    [CHANGE_SEARCH_QUERY]: () => ({}),
    [CLEAR_SEARCH_RESULTS]: () => ({}),
    [SEARCH_SUCCESS]: (state, action) => {
      const value = reduce(
        action.payload,
        (acc, value, docType) => ({
          ...acc,
          [docType]: {
            ...value,
            results: compact(
              concat(get(state, `${docType}.results`), value.results)
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
