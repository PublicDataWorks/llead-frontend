import { handleActions } from 'redux-actions'
import filter from 'lodash/filter'
import slice from 'lodash/slice'
import map from 'lodash/map'
import find from 'lodash/find'

import { SAVE_RECENT_ITEM } from 'action-types/common/recent-items'
import { RECENT_ITEMS_FETCH_SUCCESS } from 'action-types/front-page'
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
    [RECENT_ITEMS_FETCH_SUCCESS]: (state, action) => {
      const recentItemsData = action.payload

      return map(state, (recentItem) => {
        const itemType = recentItem['type']
        const data = find(recentItemsData[itemType.toLowerCase()], [
          'id',
          recentItem['id'],
        ])
        return { ...recentItem, data: data }
      })
    },
  },
  []
)
