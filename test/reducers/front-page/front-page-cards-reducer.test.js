import frontPageCardsReducer from 'reducers/front-page/front-page-cards-reducer'

import { FRONT_PAGE_CARDS_FETCH_SUCCESS } from 'action-types/front-page'

describe('#frontPageCardsReducer', () => {
  it('returns initial state', () => {
    expect(frontPageCardsReducer(undefined, {})).toStrictEqual({})
  })

  it('handles FRONT_PAGE_CARDS_FETCH_SUCCESS', () => {
    const frontPageCards = [
      {
        content: 'DEPARTMENT',
        order: 1,
      },
      {
        content: 'OFFICER',
        order: 2,
      },
    ]

    const result = frontPageCardsReducer(
      {},
      {
        type: FRONT_PAGE_CARDS_FETCH_SUCCESS,
        payload: frontPageCards,
      }
    )

    expect(result).toStrictEqual(frontPageCards)
  })
})
