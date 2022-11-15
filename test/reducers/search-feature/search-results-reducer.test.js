import searchResultsReducer from 'reducers/search-feature/search-results-reducer'

import {
  SEARCH_SUCCESS,
  CHANGE_SEARCH_QUERY,
  FLUSH_SEARCH,
  SEARCH_START,
} from 'action-types/common/search-feature'

describe('#searchResultsReducer', () => {
  it('should return initial state', () => {
    expect(searchResultsReducer(undefined, {})).toStrictEqual({})
  })

  describe('handles SEARCH_START', () => {
    it('returns empty object if request has no offset param', () => {
      const result = searchResultsReducer(
        {
          agencies: {
            results: [{ id: 123, name: 'department 1' }],
            next: null,
            count: 1,
          },
        },
        {
          type: SEARCH_START,
        }
      )

      expect(result).toStrictEqual({})
    })

    it('returns old state if request has offset param', () => {
      const result = searchResultsReducer(
        {
          agencies: {
            results: [{ id: 123, name: 'department 1' }],
            next: null,
            count: 1,
          },
        },
        {
          type: SEARCH_START,
          request: {
            params: {
              offset: 10,
            },
          },
        }
      )

      expect(result).toStrictEqual({
        agencies: {
          results: [{ id: 123, name: 'department 1' }],
          next: null,
          count: 1,
        },
      })
    })
  })

  it('should handle SEARCH_SUCCESS', () => {
    const searchResults = {
      agencies: { results: [{ id: 123, name: 'department 1' }] },
      officers: { results: [{ id: 456, name: 'officer 1' }] },
      documents: { results: [{ id: 789, name: 'document 1' }] },
    }

    const result = searchResultsReducer(
      {},
      {
        type: SEARCH_SUCCESS,
        payload: searchResults,
      }
    )

    expect(result).toStrictEqual({
      agencies: { results: [{ id: 123, name: 'department 1' }] },
      officers: { results: [{ id: 456, name: 'officer 1' }] },
      documents: { results: [{ id: 789, name: 'document 1' }] },
    })
  })

  it('should handle SEARCH_SUCCESS on existed state', () => {
    const searchResults = {
      agencies: {
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
      agencies: {
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
        results: [
          { id: 777, name: 'document 0' },
          { id: 789, name: 'document 1' },
        ],
        next: null,
        count: 2,
      },
    }

    const result = searchResultsReducer(previousState, {
      type: SEARCH_SUCCESS,
      payload: searchResults,
    })

    expect(result).toStrictEqual(expected_result)
  })

  it('should handle CHANGE_SEARCH_QUERY on empty', () => {
    const currentState = {
      agencies: { results: [{ id: 123, name: 'department 1' }] },
      officers: { results: [{ id: 456, name: 'officer 1' }] },
      documents: { results: [{ id: 789, name: 'document 1' }] },
    }

    const result = searchResultsReducer(currentState, {
      type: CHANGE_SEARCH_QUERY,
    })

    expect(result).toStrictEqual({})
  })
  it('should handle CHANGE_SEARCH_QUERY on query existed', () => {
    const currentState = {
      agencies: { results: [{ id: 123, name: 'department 1' }] },
      officers: { results: [{ id: 456, name: 'officer 1' }] },
      documents: { results: [{ id: 789, name: 'document 1' }] },
    }

    const result = searchResultsReducer(currentState, {
      type: CHANGE_SEARCH_QUERY,
      payload: 'query',
    })

    expect(result).toStrictEqual({})
  })

  it('handles FLUSH_SEARCH', () => {
    const currentState = {
      agencies: { results: [{ id: 123, name: 'department 1' }] },
      officers: { results: [{ id: 456, name: 'officer 1' }] },
      documents: { results: [{ id: 789, name: 'document 1' }] },
    }

    const result = searchResultsReducer(currentState, {
      type: FLUSH_SEARCH,
    })

    expect(result).toStrictEqual({})
  })

  it('handles SEARCH_SUCCESS on existed state with duplicate', () => {
    const searchResults = {
      agencies: {
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
        count: 1,
      },
    }
    const previousState = {
      documents: {
        results: [{ id: 789, name: 'document 1' }],
        next: null,
        count: 1,
      },
    }
    const expected_result = {
      agencies: {
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
        count: 1,
      },
    }

    const result = searchResultsReducer(previousState, {
      type: SEARCH_SUCCESS,
      payload: searchResults,
    })

    expect(result).toStrictEqual(expected_result)
  })
})
