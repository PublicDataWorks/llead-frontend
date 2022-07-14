import { SET_MAP_CURRENT_INDEX } from 'action-types/front-page'
import mapCurrentIndexReducer from 'reducers/front-page/map-current-index-reducer'

describe('#mapCurrentIndexReducer', () => {
  it('handles intial state', () => {
    const result = mapCurrentIndexReducer(undefined, {})

    expect(result).toEqual(0)
  })

  it('handles SET_MAP_CURRENT_INDEX', () => {
    const index = 1

    const result = mapCurrentIndexReducer(null, {
      type: SET_MAP_CURRENT_INDEX,
      payload: index,
    })

    expect(result).toEqual(index)
  })
})
