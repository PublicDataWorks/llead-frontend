import { handleActions } from 'redux-actions'

import { NEWS_ARTICLES_FETCH_SUCCESS } from 'action-types/front-page'

export default handleActions(
  {
    [NEWS_ARTICLES_FETCH_SUCCESS]: (state, action) => action.payload,
  },
  []
)
