import isResultLoading from 'reducers/search-feature/is-result-loading-reducer'

import {
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_ALL_START,
  SEARCH_ALL_SUCCESS,
} from 'action-types/common/search-feature'

describe('#isSearchingReducer', () => {
  it('returns initial state', () => {
    expect(isResultLoading(undefined, {})).toStrictEqual(false)
  })

  it('handles SEARCH_START', () => {
    const state = isResultLoading(null, {
      type: SEARCH_START,
    })
    expect(state).toEqual(true)
  })

  it('handles SEARCH_SUCCESS', () => {
    const state = isResultLoading(null, {
      type: SEARCH_SUCCESS,
    })
    expect(state).toEqual(false)
  })

  it('handles SEARCH_ALL_START', () => {
    const state = isResultLoading(null, {
      type: SEARCH_ALL_START,
    })
    expect(state).toEqual(true)
  })

  it('handles SEARCH_ALL_SUCCESS', () => {
    const state = isResultLoading(null, {
      type: SEARCH_ALL_SUCCESS,
    })
    expect(state).toEqual(false)
  })
})
