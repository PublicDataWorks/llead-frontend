import recentItemsReducer from 'reducers/recent-items-reducer'

import { SAVE_RECENT_ITEM } from 'action-types/common/recent-items'
import { RECENT_ITEMS_FETCH_SUCCESS } from 'action-types/front-page'

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
      const recentItem = { type: 'OFFICER', id: 1 }
      const newRecentItem = { type: 'DEPARTMENT', id: 2 }

      const result = recentItemsReducer([recentItem], {
        type: SAVE_RECENT_ITEM,
        payload: newRecentItem,
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
          type: SAVE_RECENT_ITEM,
          payload: recentItem2,
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

  describe('handle RECENT_ITEMS_FETCH_SUCCESS', () => {
    it('should add data to recentItems', () => {
      const recentItem1 = { type: 'OFFICER', id: 1 }
      const recentItem2 = { type: 'DEPARTMENT', id: 2 }
      const recentItem3 = { type: 'DOCUMENT', id: 3 }
      const recentItem4 = { type: 'DEPARTMENT', id: 1 }
      const recentItem5 = { type: 'OFFICER', id: 4 }

      const department_1 = {
        id: 1,
        name: 'department1 name',
      }
      const department_2 = {
        id: 2,
        name: 'department2 name',
      }
      const officer_1 = {
        id: 1,
        name: 'officer1 name',
      }
      const document_3 = {
        id: 3,
        name: 'officer1 name',
      }

      const result = recentItemsReducer(
        [recentItem1, recentItem2, recentItem3, recentItem4, recentItem5],
        {
          type: RECENT_ITEMS_FETCH_SUCCESS,
          payload: {
            officer: [officer_1],
            department: [department_1, department_2],
            document: [document_3],
          },
        }
      )

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
        {
          ...recentItem5,
          data: undefined,
        },
      ])
    })
  })
})
