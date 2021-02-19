import searchQueryReducer from 'reducers/search-page/search-query-reducer'

import { CHANGE_SEARCH_QUERY } from 'action-types/search-page'

describe('#searchQueryReducer', () => {
  it('should return initial state', () => {
    expect(searchQueryReducer(undefined, {})).toBe('')
  })

  it('should handle CHANGE_SEARCH_QUERY', () => {
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
})
