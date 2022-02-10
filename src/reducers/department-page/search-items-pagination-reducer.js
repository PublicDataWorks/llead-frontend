import { handleActions } from 'redux-actions'
import qs from 'qs'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

import {
  SEARCH_ITEMS_START,
  SEARCH_ITEMS_SUCCESS,
} from 'action-types/department-page'

export default handleActions(
  {
    [SEARCH_ITEMS_START]: (state) => state,
    [SEARCH_ITEMS_SUCCESS]: (state, action) => {
      let limit, offset

      const kind = get(action, 'request.params.kind')

      const { next, count } = action.payload

      if (!isEmpty(next)) {
        try {
          const searchParams = new URL(next).search
          const {
            limit: parsedLimit,
            offset: parsedOffset,
          } = qs.parse(searchParams, { ignoreQueryPrefix: true })
          limit = parseInt(parsedLimit)
          offset = parseInt(parsedOffset)
        } catch (error) {
          limit = offset = null
        }
      }
      return {
        limit,
        offset,
        count,
        kind,
      }
    },
  },
  {}
)
