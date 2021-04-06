import { createSelector } from 'reselect'
import get from 'lodash/get'
import map from 'lodash/map'
import groupBy from 'lodash/groupBy'
import transform from 'lodash/transform'
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

export const recentItemIdsSelector = createSelector(
  getRecentItems,
  (recentItems) => {
    const recentItemsGroup = groupBy(recentItems, (recentItem) =>
      get(recentItem, 'type')
    )
    return transform(recentItemsGroup, (result, items, itemType) => {
      result[`${itemType.toLowerCase()}_ids`] = map(items, 'id')
    })
  }
)

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
