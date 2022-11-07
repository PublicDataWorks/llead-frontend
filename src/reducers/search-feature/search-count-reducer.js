import { handleActions } from 'redux-actions'
import reduce from 'lodash/reduce'

import {
  SEARCH_ALL_SUCCESS,
  CHANGE_SEARCH_QUERY,
  FLUSH_SEARCH,
} from 'action-types/common/search-feature'

const defaullCount = {
  all: 0,
  agencies: 0,
  officers: 0,
  documents: 0,
  articles: 0,
}

export default handleActions(
  {
    [CHANGE_SEARCH_QUERY]: () => defaullCount,
    [FLUSH_SEARCH]: () => defaullCount,
    [SEARCH_ALL_SUCCESS]: (state, action) => {
      const searchCount = reduce(
        action.payload,
        (acc, value, docType) => ({
          ...acc,
          [docType]: value.count,
        }),
        {}
      )

      const allCount = reduce(searchCount, (acc, value) => acc + value, 0)

      return {
        all: allCount,
        ...searchCount,
      }
    },
  },
  {}
)
