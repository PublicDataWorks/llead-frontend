import informationReducer from 'reducers/about-page/q-and-a-reducer'

import {
  Q_AND_A_FETCH_START,
  Q_AND_A_FETCH_SUCCESS,
} from 'action-types/about-page'

describe('#informationReducer', () => {
  it('should return initial state', () => {
    expect(informationReducer(undefined, {})).toStrictEqual([])
  })

  it('handles Q_AND_A_FETCH_START', () => {
    const result = informationReducer(
      {},
      {
        type: Q_AND_A_FETCH_START,
      }
    )

    expect(result).toStrictEqual([])
  })

  it('should handle Q_AND_A_FETCH_SUCCESS', () => {
    const information = { id: 1, name: 'information' }

    const result = informationReducer(
      {},
      {
        type: Q_AND_A_FETCH_SUCCESS,
        payload: information,
      }
    )

    expect(result).toStrictEqual(information)
  })
})
