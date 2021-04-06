import * as actionTypes from 'action-types/common/recent-items'
import { createAction } from 'redux-actions'

export const saveRecentItem = createAction(actionTypes.SAVE_RECENT_ITEM)
