import searchItemsPaginationReducer from 'reducers/department-page/search-items-pagination-reducer'
import {
  SEARCH_ITEMS_START,
  SEARCH_ITEMS_SUCCESS,
} from 'action-types/department-page'

describe('#searchItemsPaginationReducer', () => {
  it('returns initial state', () => {
    expect(searchItemsPaginationReducer(undefined, {})).toStrictEqual({})
  })

  it('handles SEARCH_ITEMS_START', () => {
    const result = searchItemsPaginationReducer(
      { count: 10 },
      {
        type: SEARCH_ITEMS_START,
        request: {
          params: { offset: 5 },
        },
      }
    )

    expect(result).toStrictEqual({ count: 10 })
  })

  it('handles SEARCH_ITEMS_START with empty next', () => {
    const itemsData = {
      next: null,
      previous: null,
      count: 1,
      results: ['result item'],
    }

    const result = searchItemsPaginationReducer(
      {},
      {
        type: SEARCH_ITEMS_SUCCESS,
        payload: itemsData,
      }
    )

    expect(result).toStrictEqual({
      limit: undefined,
      offset: undefined,
      count: 1,
      kind: undefined,
    })
  })

  it('handles SEARCH_ITEMS_SUCCESS with invalid next value', () => {
    const itemsData = {
      next: 'next',
      previous: null,
      count: 1,
      results: ['result item'],
    }

    const result = searchItemsPaginationReducer(
      {},
      {
        type: SEARCH_ITEMS_SUCCESS,
        payload: itemsData,
        request: { params: { kind: 'officers' } },
      }
    )

    expect(result).toStrictEqual({
      limit: null,
      offset: null,
      count: 1,
      kind: 'officers',
    })
  })

  it('handles SEARCH_ITEMS_SUCCESS with valid next value', () => {
    const itemsData = {
      next: 'https://url.com/?limit=2&offset=1&kind=officers',
      previous: null,
      count: 1,
      results: ['result item'],
    }

    const result = searchItemsPaginationReducer(
      {},
      {
        type: SEARCH_ITEMS_SUCCESS,
        payload: itemsData,
        request: { params: { kind: 'officers' } },
      }
    )

    expect(result).toStrictEqual({
      limit: 2,
      offset: 1,
      count: 1,
      kind: 'officers',
    })
  })
})
