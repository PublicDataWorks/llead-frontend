import searchQueryReducer from 'reducers/search-feature/search-query-reducer'

import {
  CHANGE_SEARCH_QUERY,
  FLUSH_SEARCH,
} from 'action-types/common/search-feature'

describe('#searchQueryReducer', () => {
  it('returns initial state', () => {
    expect(searchQueryReducer(undefined, {})).toBe('')
  })

  it('handles CHANGE_SEARCH_QUERY', () => {
    const searchQuery = 'searchquery'

    const result = searchQueryReducer(
      {},
      {
        type: CHANGE_SEARCH_QUERY,
        payload: searchQuery,
      }
    )

    expect(result).toStrictEqual(searchQuery)
  })

  it('handles FLUSH_SEARCH', () => {
    const result = searchQueryReducer('any old queyr', {
      type: FLUSH_SEARCH,
    })

    expect(result).toStrictEqual('')
  })
})
