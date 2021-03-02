import { handleActions } from 'redux-actions'
import qs from 'qs'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

import {
  DEPARTMENT_DOCUMENTS_FETCH_START,
  DEPARTMENT_DOCUMENTS_FETCH_SUCCESS,
} from 'action-types/department-page'

export default handleActions(
  {
    [DEPARTMENT_DOCUMENTS_FETCH_START]: (state, action) => {
      const offset = get(action.request, 'params.offset', 0)
      return offset === 0 ? {} : state
    },
    [DEPARTMENT_DOCUMENTS_FETCH_SUCCESS]: (state, action) => {
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
