import frontPageOrdersReducer from 'reducers/front-page/front-page-orders-reducer'

import { FRONT_PAGE_ORDERS_FETCH_SUCCESS } from 'action-types/front-page'

describe('#analyticFrontPageOrdersReducer', () => {
  it('should return initial state', () => {
    expect(frontPageOrdersReducer(undefined, {})).toStrictEqual({})
  })

  it('should handle FRONT_PAGE_ORDERS_FETCH_SUCCESS', () => {
    const frontPageOrders = [
      {
        section: 'DEPARTMENT',
        order: 1,
      },
      {
        section: 'OFFICER',
        order: 2,
      },
    ]

    const result = frontPageOrdersReducer(
      {},
      {
        type: FRONT_PAGE_ORDERS_FETCH_SUCCESS,
        payload: frontPageOrders,
      }
    )

    expect(result).toStrictEqual(frontPageOrders)
  })
})
