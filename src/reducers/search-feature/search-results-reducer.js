import { handleActions } from 'redux-actions'
import reduce from 'lodash/reduce'
import compact from 'lodash/compact'
import get from 'lodash/get'
import unionBy from 'lodash/unionBy'
import isUndefined from 'lodash/isUndefined'

import {
  SEARCH_SUCCESS,
  SEARCH_START,
  CHANGE_SEARCH_QUERY,
  FLUSH_SEARCH,
} from 'action-types/common/search-feature'

export default handleActions(
  {
    [CHANGE_SEARCH_QUERY]: () => ({}),
    [FLUSH_SEARCH]: () => ({}),
    [SEARCH_START]: (state, action) => {
      const isFreshReq = isUndefined(get(action, 'request.params.offset'))
      return isFreshReq ? {} : state
    },
    [SEARCH_SUCCESS]: (state, action) => {
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
