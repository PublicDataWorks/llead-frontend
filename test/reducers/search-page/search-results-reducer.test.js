import searchResultsReducer from 'reducers/search-page/search-results-reducer'

import { SEARCH_SUCCESS, CHANGE_SEARCH_QUERY } from 'action-types/search-page'

describe('#searchResultsReducer', () => {
  it('should return initial state', () => {
    expect(searchResultsReducer(undefined, {})).toStrictEqual({})
  })

  it('should handle SEARCH_SUCCESS', () => {
    const searchResults = {
      departments: {results: [{ id: 123, name: 'department 1' }]},
      officers: {results: [{ id: 456, name: 'officer 1' }]},
      documents: {results: [{ id: 789, name: 'document 1' }]},
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

  it('should handle SEARCH_SUCCESS on existed state', () => {
    const searchResults = {
      departments: {
        results: [{ id: 123, name: 'department 1' }],
        next: null,
        count: 1,
      },
      officers: {
        results: [{ id: 456, name: 'officer 1' }],
        next: null,
        count: 1,
      },
      documents: {
        results: [{ id: 789, name: 'document 1' }],
        next: null,
        count: 2,
      },
    }
    const previousState = {
      documents: {
        results: [{ id: 777, name: 'document 0' }],
        next: 'next',
        count: 2,
      },
    }
    const expected_result = {
      departments: {
        results: [{ id: 123, name: 'department 1' }],
        next: null,
        count: 1,
      },
      officers: {
        results: [{ id: 456, name: 'officer 1' }],
        next: null,
        count: 1,
      },
      documents: {
        results: [{ id: 777, name: 'document 0' },{ id: 789, name: 'document 1' }],
        next: null,
        count: 2,
      },
    }

    const result = searchResultsReducer(
      previousState,
      {
        type: SEARCH_SUCCESS,
        payload: searchResults,
      }
    )

    expect(result).toStrictEqual(expected_result)
  })

  it('should handle CHANGE_SEARCH_QUERY on empty', () => {
    const currentState = {
      departments: {results: [{ id: 123, name: 'department 1' }]},
      officers: {results: [{ id: 456, name: 'officer 1' }]},
      documents: {results: [{ id: 789, name: 'document 1' }]},
    }

    const result = searchResultsReducer(currentState, {
      type: CHANGE_SEARCH_QUERY,
    })

    expect(result).toStrictEqual({})
  })
  it('should handle CHANGE_SEARCH_QUERY on query existed', () => {
    const currentState = {
      departments: {results: [{ id: 123, name: 'department 1' }]},
      officers: {results: [{ id: 456, name: 'officer 1' }]},
      documents: {results: [{ id: 789, name: 'document 1' }]},
    }

    const result = searchResultsReducer(currentState, {
      type: CHANGE_SEARCH_QUERY,
      payload: 'query',
    })

    expect(result).toStrictEqual({})
  })
})
