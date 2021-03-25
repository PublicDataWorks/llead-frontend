import recentItemsReducer from 'reducers/recent-items-reducer'

import { SAVE_RECENT_ITEM } from 'action-types/common/recent-items'

jest.mock('constants/common', () => ({
  ...jest.requireActual('constants/common'),
  MAX_RECENT_ITEMS: 4,
}))

describe('#recentItemsReducer', () => {
  it('should return initial state', () => {
    expect(recentItemsReducer(undefined, {})).toStrictEqual([])
  })

  describe('handle SAVE_RECENT_ITEM', () => {
    it('should add new item to top of recentItems', () => {
      const recentItem = { type: 'ITEM_TYPE-1', id: 'item-id-1' }
      const newRecentItem = { type: 'ITEM_TYPE_2', id: 'item-id-2' }

      const result = recentItemsReducer([recentItem], {
        type: SAVE_RECENT_ITEM,
        payload: newRecentItem,
      })

      expect(result).toStrictEqual([newRecentItem, recentItem])
    })

    it('should move the item to the top if it already exists in recentItems', () => {
      const recentItem1 = { type: 'ITEM_TYPE_1', id: 'item-id-1' }
      const recentItem2 = { type: 'ITEM_TYPE_2', id: 'item-id-2' }
      const recentItem3 = { type: 'ITEM_TYPE_3', id: 'item-id-3' }

      const result = recentItemsReducer(
        [recentItem1, recentItem2, recentItem3],
        {
          type: SAVE_RECENT_ITEM,
          payload: recentItem2,
        }
      )

      expect(result).toStrictEqual([recentItem2, recentItem1, recentItem3])
    })

    it('should keep limit number items of recentItems', () => {
      const recentItem1 = { type: 'ITEM_TYPE_1', id: 'item-id-1' }
      const recentItem2 = { type: 'ITEM_TYPE_2', id: 'item-id-2' }
      const recentItem3 = { type: 'ITEM_TYPE_3', id: 'item-id-3' }
      const recentItem4 = { type: 'ITEM_TYPE_4', id: 'item-id-4' }
      const newRecentItem = { type: 'ITEM_TYPE_5', id: 'item-id-5' }

      const result = recentItemsReducer(
        [recentItem1, recentItem2, recentItem3, recentItem4],
        {
          type: SAVE_RECENT_ITEM,
          payload: newRecentItem,
        }
      )

      expect(result).toStrictEqual([
        newRecentItem,
        recentItem1,
        recentItem2,
        recentItem3,
      ])
    })
  })
})
