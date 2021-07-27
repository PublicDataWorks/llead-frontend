import { createSelector } from 'reselect'
import get from 'lodash/get'
import map from 'lodash/map'
import compact from 'lodash/compact'

import { RECENT_ITEM_TYPES } from 'constants/common'
import {
  departmentFormatter,
  officerFormatter,
  documentFormatter,
} from 'selectors/common'

const RECENT_FORMATTERS_MAPPING = {
  [RECENT_ITEM_TYPES.DEPARTMENT]: departmentFormatter,
  [RECENT_ITEM_TYPES.OFFICER]: officerFormatter,
  [RECENT_ITEM_TYPES.DOCUMENT]: documentFormatter,
}

const getRecentItems = (state) => get(state, 'recentItems')

export const recentItemsSelector = createSelector(
  getRecentItems,
  (recentItems) => {
    return compact(
      map(recentItems, (recentItem) => {
        const itemType = recentItem['type']
        const data = recentItem['data']
        const formatter = get(RECENT_FORMATTERS_MAPPING, itemType)
        if (data && formatter) {
          return { type: itemType, ...formatter(data) }
        }
      })
    )
  }
)
