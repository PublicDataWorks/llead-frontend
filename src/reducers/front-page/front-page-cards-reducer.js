import { handleActions } from 'redux-actions'

import { FRONT_PAGE_CARDS_FETCH_SUCCESS } from 'action-types/front-page'

export default handleActions(
  {
    [FRONT_PAGE_CARDS_FETCH_SUCCESS]: (state, action) => action.payload,
  },
  {}
)
