import searchAllResultsReducer from 'reducers/search-feature/search-all-results-reducer'

import {
  SEARCH_ALL_SUCCESS,
  CHANGE_SEARCH_QUERY,
  FLUSH_SEARCH,
} from 'action-types/common/search-feature'

describe('#searchAllResultsReducer', () => {
  it('returns initial state', () => {
    expect(searchAllResultsReducer(undefined, {})).toStrictEqual({})
  })

  it('handles SEARCH_ALL_SUCCESS', () => {
    const searchResults = {
      departments: { results: [{ id: 123, name: 'department 1' }] },
      officers: { results: [{ id: 456, name: 'officer 1' }] },
      documents: { results: [{ id: 789, name: 'document 1' }] },
    }

    const result = searchAllResultsReducer(
      {},
      {
        type: SEARCH_ALL_SUCCESS,
        payload: searchResults,
      }
    )

    expect(result).toStrictEqual(searchResults)
  })

  it('handles SEARCH_ALL_SUCCESS on existed state', () => {
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
        results: [
          { id: 777, name: 'document 0' },
          { id: 789, name: 'document 1' },
        ],
        next: null,
        count: 2,
      },
    }

    const result = searchAllResultsReducer(previousState, {
      type: SEARCH_ALL_SUCCESS,
      payload: searchResults,
    })

    expect(result).toStrictEqual(expected_result)
  })

  it('handles CHANGE_SEARCH_QUERY on empty', () => {
    const currentState = {
      departments: { results: [{ id: 123, name: 'department 1' }] },
      officers: { results: [{ id: 456, name: 'officer 1' }] },
      documents: { results: [{ id: 789, name: 'document 1' }] },
    }

    const result = searchAllResultsReducer(currentState, {
      type: CHANGE_SEARCH_QUERY,
    })

    expect(result).toStrictEqual({})
  })
  it('handles CHANGE_SEARCH_QUERY on query existed', () => {
    const currentState = {
      departments: { results: [{ id: 123, name: 'department 1' }] },
      officers: { results: [{ id: 456, name: 'officer 1' }] },
      documents: { results: [{ id: 789, name: 'document 1' }] },
    }

    const result = searchAllResultsReducer(currentState, {
      type: CHANGE_SEARCH_QUERY,
      payload: 'query',
    })

    expect(result).toStrictEqual({})
  })

  it('handles FLUSH_SEARCH', () => {
    const currentState = {
      departments: { results: [{ id: 123, name: 'department 1' }] },
      officers: { results: [{ id: 456, name: 'officer 1' }] },
      documents: { results: [{ id: 789, name: 'document 1' }] },
    }

    const result = searchAllResultsReducer(currentState, {
      type: FLUSH_SEARCH,
    })

    expect(result).toStrictEqual({})
  })

  it('handles SEARCH_ALL_SUCCESS on existed state with duplicate', () => {
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
        count: 1,
      },
    }

    const result = searchAllResultsReducer(previousState, {
      type: SEARCH_ALL_SUCCESS,
      payload: searchResults,
    })

    expect(result).toStrictEqual(expected_result)
  })
})
