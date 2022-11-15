import searchCountReducer from 'reducers/search-feature/search-count-reducer'

import {
  SEARCH_ALL_SUCCESS,
  CHANGE_SEARCH_QUERY,
  FLUSH_SEARCH,
} from 'action-types/common/search-feature'

describe('#searchCountReducer', () => {
  it('returns initial state', () => {
    expect(searchCountReducer(undefined, {})).toStrictEqual({})
  })

  it('handles SEARCH_ALL_SUCCESS', () => {
    const searchResults = {
      agencies: { count: 1, results: [{ id: 123, name: 'department 1' }] },
      officers: { count: 2, results: [{ id: 456, name: 'officer 1' }] },
      documents: { count: 3, results: [{ id: 789, name: 'document 1' }] },
      articles: { count: 3, results: [{ id: 786, name: 'article 1' }] },
    }

    const result = searchCountReducer(
      {},
      {
        type: SEARCH_ALL_SUCCESS,
        payload: searchResults,
      }
    )

    expect(result).toStrictEqual({
      all: 9,
      agencies: 1,
      officers: 2,
      documents: 3,
      articles: 3,
    })
  })

  it('handles SEARCH_ALL_SUCCESS on existed state', () => {
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
        count: 3,
      },
    }
    const previousState = {
      documents: {
        results: [{ id: 777, name: 'document 0' }],
        next: 'next',
        count: 2,
      },
    }

    const result = searchCountReducer(previousState, {
      type: SEARCH_ALL_SUCCESS,
      payload: searchResults,
    })

    expect(result).toStrictEqual({
      all: 5,
      agencies: 1,
      officers: 1,
      documents: 3,
    })
  })

  it('handles CHANGE_SEARCH_QUERY', () => {
    const currentState = {
      agencies: { results: [{ id: 123, name: 'department 1' }] },
      officers: { results: [{ id: 456, name: 'officer 1' }] },
      documents: { results: [{ id: 789, name: 'document 1' }] },
    }

    const result = searchCountReducer(currentState, {
      type: CHANGE_SEARCH_QUERY,
      payload: 'query',
    })

    expect(result).toStrictEqual({
      all: 0,
      agencies: 0,
      officers: 0,
      documents: 0,
      articles: 0,
    })
  })

  it('handles FLUSH_SEARCH', () => {
    const currentState = {
      agencies: { results: [{ id: 123, name: 'department 1' }] },
      officers: { results: [{ id: 456, name: 'officer 1' }] },
      documents: { results: [{ id: 789, name: 'document 1' }] },
    }

    const result = searchCountReducer(currentState, {
      type: FLUSH_SEARCH,
    })

    expect(result).toStrictEqual({
      all: 0,
      agencies: 0,
      officers: 0,
      documents: 0,
      articles: 0,
    })
  })
})
