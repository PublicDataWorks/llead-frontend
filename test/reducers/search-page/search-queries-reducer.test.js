import sinon from 'sinon'

import searchQueriesReducer from 'reducers/search-page/search-queries-reducer'
import { SAVE_SEARCH_QUERY } from 'action-types/search-page'
import * as commonConstant from 'constants/common'

describe('#searchQueryReducer', () => {
  it('should return initial state', () => {
    expect(searchQueriesReducer(undefined, {})).toStrictEqual([])
  })

  describe('handle SAVE_SEARCH_QUERY', () => {
    it('should add search query', () => {
      const searchQuery = 'query 2'

      const result = searchQueriesReducer(['query 1'], {
        type: SAVE_SEARCH_QUERY,
        payload: searchQuery,
      })

      expect(result).toStrictEqual(['query 2', 'query 1'])
    })

    it('should add search query and remove duplicates', () => {
      const searchQuery = 'query 2'

      const result = searchQueriesReducer(['query 1', 'query 2'], {
        type: SAVE_SEARCH_QUERY,
        payload: searchQuery,
      })

      expect(result).toStrictEqual(['query 2', 'query 1'])
    })

    it('should add search query and slice the queries to the MAX_SEARCH_QUERIES', () => {
      sinon.stub(commonConstant, 'MAX_SEARCH_QUERIES').get(() => 3)
      const searchQuery = 'query 4'

      const result = searchQueriesReducer(['query 1', 'query 2', 'query 3'], {
        type: SAVE_SEARCH_QUERY,
        payload: searchQuery,
      })

      expect(result).toStrictEqual(['query 4', 'query 1', 'query 2'])
    })
  })
})
