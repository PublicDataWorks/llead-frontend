import recentItemsReducer from 'reducers/recent-items-reducer'

import { SAVE_RECENT_ITEM_START } from 'action-types/common/recent-items'
import { RECENT_ITEMS_FETCH_SUCCESS } from 'action-types/common/recent-items'

jest.mock('constants/common', () => ({
  ...jest.requireActual('constants/common'),
  MAX_RECENT_ITEMS: 4,
}))

describe('#recentItemsReducer', () => {
  it('should return initial state', () => {
    expect(recentItemsReducer(undefined, {})).toStrictEqual([])
  })

  describe('handle SAVE_RECENT_ITEM_START', () => {
    it('should add new item to top of recentItems', () => {
      const recentItem = { type: 'OFFICER', id: 1 }
      const newRecentItem = { type: 'DEPARTMENT', id: 2 }

      const result = recentItemsReducer([recentItem], {
        type: SAVE_RECENT_ITEM_START,
        request: {
          data: newRecentItem,
        },
      })

      expect(result).toStrictEqual([newRecentItem, recentItem])
    })

    it('should move the item to the top if it already exists in recentItems', () => {
      const recentItem1 = { type: 'OFFICER', id: 1 }
      const recentItem2 = { type: 'DEPARTMENT', id: 2 }
      const recentItem3 = { type: 'DOCUMENT', id: 3 }

      const result = recentItemsReducer(
        [recentItem1, recentItem2, recentItem3],
        {
          type: SAVE_RECENT_ITEM_START,
          request: {
            data: recentItem2,
          },
        }
      )

      expect(result).toStrictEqual([recentItem2, recentItem1, recentItem3])
    })

    it('should keep limit number items of recentItems', () => {
      const recentItem1 = { type: 'OFFICER', id: 1 }
      const recentItem2 = { type: 'DEPARTMENT', id: 2 }
      const recentItem3 = { type: 'DOCUMENT', id: 3 }
      const recentItem4 = { type: 'DEPARTMENT', id: 4 }
      const newRecentItem = { type: 'DOCUMENT', id: 5 }

      const result = recentItemsReducer(
        [recentItem1, recentItem2, recentItem3, recentItem4],
        {
          type: SAVE_RECENT_ITEM_START,
          request: {
            data: newRecentItem,
          },
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

  describe('handle RECENT_ITEMS_FETCH_SUCCESS', () => {
    it('should update recentItems data', () => {
      const recentItem1 = { type: 'OFFICER', id: 1 }
      const recentItem2 = { type: 'DEPARTMENT', id: 2 }
      const recentItem3 = { type: 'DOCUMENT', id: 3 }
      const recentItem4 = { type: 'DEPARTMENT', id: 1 }

      const department_1 = {
        ...recentItem4,
        name: 'department1 name',
      }
      const department_2 = {
        ...recentItem2,
        name: 'department2 name',
      }
      const officer_1 = {
        ...recentItem1,
        name: 'officer1 name',
      }
      const document_3 = {
        ...recentItem3,
        name: 'officer1 name',
      }

      const oldRecentItems = [
        {
          id: 4,
          type: 'DEPARTMENT',
          name: 'department4 name',
        },
      ]

      const newRecentItems = [officer_1, department_2, document_3, department_1]

      const result = recentItemsReducer(oldRecentItems, {
        type: RECENT_ITEMS_FETCH_SUCCESS,
        payload: newRecentItems,
      })

      expect(result).toStrictEqual([
        {
          ...recentItem1,
          data: officer_1,
        },
        {
          ...recentItem2,
          data: department_2,
        },
        {
          ...recentItem3,
          data: document_3,
        },
        {
          ...recentItem4,
          data: department_1,
        },
      ])
    })
  })
})
