import * as actionTypes from 'action-types/common/recent-items'

import { get, post } from 'utils/api'
import { RECENT_ITEMS_API_URL } from 'constants/api'

export const saveRecentItem = (recentItem) =>
  post(
    [
      actionTypes.SAVE_RECENT_ITEM_START,
      actionTypes.SAVE_RECENT_ITEM_SUCCESS,
      actionTypes.SAVE_RECENT_ITEM_FAILURE,
    ],
    RECENT_ITEMS_API_URL
  )(recentItem)

export const fetchRecentItems = () =>
  get(
    [
      actionTypes.RECENT_ITEMS_FETCH_START,
      actionTypes.RECENT_ITEMS_FETCH_SUCCESS,
      actionTypes.RECENT_ITEMS_FETCH_FAILURE,
    ],
    RECENT_ITEMS_API_URL
  )()
