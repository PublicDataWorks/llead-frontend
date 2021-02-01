import searchResultsReducer from 'reducers/search-page/search-results-reducer'

import { SEARCH_SUCCESS, CHANGE_SEARCH_QUERY } from 'action-types/search-page'

describe('#searchResultsReducer', () => {
  it('should return initial state', () => {
    expect(searchResultsReducer(undefined, {})).toStrictEqual({})
  })

  it('should handle SEARCH_SUCCESS', () => {
    const searchResults = {
      departments: [{ id: 123, name: 'department 1' }],
      officers: [{ id: 456, name: 'officer 1' }],
      documents: [{ id: 789, name: 'document 1' }],
    }

    const result = searchResultsReducer(
      {},
      {
        type: SEARCH_SUCCESS,
        payload: searchResults,
      }
    )

    expect(result).toStrictEqual(searchResults)
  })

  it('should handle CHANGE_SEARCH_QUERY on empty', () => {
    const currentState = {
      departments: [{ id: 123, name: 'department 1' }],
      officers: [{ id: 456, name: 'officer 1' }],
      documents: [{ id: 789, name: 'document 1' }],
    }

    const result = searchResultsReducer(currentState, {
      type: CHANGE_SEARCH_QUERY,
    })

    expect(result).toStrictEqual({})
  })
  it('should handle CHANGE_SEARCH_QUERY on query existed', () => {
    const currentState = {
      departments: [{ id: 123, name: 'department 1' }],
      officers: [{ id: 456, name: 'officer 1' }],
      documents: [{ id: 789, name: 'document 1' }],
    }

    const result = searchResultsReducer(currentState, {
      type: CHANGE_SEARCH_QUERY,
      payload: 'query',
    })

    expect(result).toStrictEqual(currentState)
  })
})
