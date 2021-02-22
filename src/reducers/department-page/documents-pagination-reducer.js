import { handleActions } from 'redux-actions'
import qs from 'qs'
import isEmpty from 'lodash/isEmpty'

import { DOCUMENTS_FETCH_SUCCESS } from 'action-types/department-page'

export default handleActions(
  {
    [DOCUMENTS_FETCH_SUCCESS]: (state, action) => {
      let limit, offset

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
      }
    },
  },
  {}
)
