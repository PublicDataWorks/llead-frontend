import * as actionTypes from 'action-types/common/recent-items'

import { inferGet, inferPost, authDelete } from 'utils/api'
import { RECENT_ITEMS_API_URL } from 'constants/api'

export const saveRecentItem = (recentItem) =>
  inferPost(
    [
      actionTypes.SAVE_RECENT_ITEM_START,
      actionTypes.SAVE_RECENT_ITEM_SUCCESS,
      actionTypes.SAVE_RECENT_ITEM_FAILURE,
    ],
    RECENT_ITEMS_API_URL
  )(recentItem)

export const removeRecentItem = (recentItem) =>
  authDelete(
    [
      actionTypes.REMOVE_RECENT_ITEM_START,
      actionTypes.REMOVE_RECENT_ITEM_SUCCESS,
      actionTypes.REMOVE_RECENT_ITEM_FAILURE,
    ],
    RECENT_ITEMS_API_URL
  )(recentItem)

export const fetchRecentItems = () =>
  inferGet(
    [
      actionTypes.RECENT_ITEMS_FETCH_START,
      actionTypes.RECENT_ITEMS_FETCH_SUCCESS,
      actionTypes.RECENT_ITEMS_FETCH_FAILURE,
    ],
    RECENT_ITEMS_API_URL
  )()
