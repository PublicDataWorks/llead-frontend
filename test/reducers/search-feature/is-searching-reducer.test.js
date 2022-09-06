import isSearchingReducer from 'reducers/search-feature/is-searching-reducer'

import {
  SEARCH_FAILURE,
  SEARCH_START,
  SEARCH_SUCCESS,
} from 'action-types/common/search-feature'

describe('#isSearchingReducer', () => {
  it('returns initial state', () => {
    expect(isSearchingReducer(undefined, {})).toStrictEqual(false)
  })

  it('handles SEARCH_START', () => {
    const state = isSearchingReducer(null, {
      type: SEARCH_START,
    })
    expect(state).toEqual(true)
  })

  it('handles SEARCH_SUCCESS', () => {
    const state = isSearchingReducer(null, {
      type: SEARCH_SUCCESS,
    })
    expect(state).toEqual(false)
  })

  it('handles SEARCH_FAILURE', () => {
    const state = isSearchingReducer(null, {
      type: SEARCH_FAILURE,
    })
    expect(state).toEqual(false)
  })
})
