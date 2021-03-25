import { handleActions } from 'redux-actions'
import filter from 'lodash/filter'
import slice from 'lodash/slice'

import { SAVE_RECENT_ITEM } from 'action-types/common/recent-items'
import { MAX_RECENT_ITEMS } from 'constants/common'

const findRecentItem = (item, recentItem) => {
  return item.type === recentItem.type && item.id === recentItem.id
}

export default handleActions(
  {
    [SAVE_RECENT_ITEM]: (state, action) => {
      const recentItem = action.payload

      const newData = filter(state, (item) => !findRecentItem(item, recentItem))
      newData.unshift(recentItem)
      return slice(newData, 0, MAX_RECENT_ITEMS)
    },
  },
  []
)
