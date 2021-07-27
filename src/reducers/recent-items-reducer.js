import { handleActions } from 'redux-actions'
import filter from 'lodash/filter'
import slice from 'lodash/slice'
import map from 'lodash/map'

import { SAVE_RECENT_ITEM_START } from 'action-types/common/recent-items'
import { RECENT_ITEMS_FETCH_SUCCESS } from 'action-types/common/recent-items'
import { MAX_RECENT_ITEMS } from 'constants/common'

const findRecentItem = (item, recentItem) => {
  return item.type === recentItem.type && item.id === recentItem.id
}

export default handleActions(
  {
    [SAVE_RECENT_ITEM_START]: (state, action) => {
      const recentItem = action.request.data

      const newData = filter(state, (item) => !findRecentItem(item, recentItem))
      newData.unshift(recentItem)
      return slice(newData, 0, MAX_RECENT_ITEMS)
    },
    [RECENT_ITEMS_FETCH_SUCCESS]: (state, action) => {
      const recentItemsData = action.payload

      return map(recentItemsData, (recentItem) => {
        const { type, id } = recentItem
        return { type, id, data: recentItem }
      })
    },
  },
  []
)
