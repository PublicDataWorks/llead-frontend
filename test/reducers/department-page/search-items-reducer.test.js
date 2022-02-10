import searchItemsReducer from 'reducers/department-page/search-items-reducer'
import {
  CLEAR_DEPARTMENT_SEARCH_RESULTS,
  SEARCH_ITEMS_START,
  SEARCH_ITEMS_SUCCESS,
} from 'action-types/department-page'

describe('#searchItemsReducer', () => {
  it('returns initial state', () => {
    expect(searchItemsReducer(undefined, {})).toStrictEqual([])
  })

  it('handles SEARCH_ITEMS_START without request params offset', () => {
    const result = searchItemsReducer(['result item'], {
      type: SEARCH_ITEMS_START,
    })

    expect(result).toStrictEqual([])
  })

  it('handles SEARCH_ITEMS_START with request params limit', () => {
    const result = searchItemsReducer(['result item'], {
      type: SEARCH_ITEMS_START,
      request: {
        params: { limit: 5 },
      },
    })

    expect(result).toStrictEqual(['result item'])
  })

  it('handles CLEAR_DEPARTMENT_SEARCH_RESULTS', () => {
    const result = searchItemsReducer(['result item'], {
      type: CLEAR_DEPARTMENT_SEARCH_RESULTS,
    })

    expect(result).toStrictEqual([])
  })

  it('handles SEARCH_ITEMS_SUCCESS with no previous payload', () => {
    const itemsData = {
      next: 'next',
      previous: null,
      count: 1,
      results: ['result item'],
    }

    const result = searchItemsReducer(['old result item'], {
      type: SEARCH_ITEMS_SUCCESS,
      payload: itemsData,
    })

    expect(result).toStrictEqual(['result item'])
  })

  it('handles SEARCH_ITEMS_SUCCESS with previous payload', () => {
    const itemsData = {
      next: 'next',
      previous: 'previous',
      count: 1,
      results: ['result item'],
    }

    const result = searchItemsReducer(['old result item'], {
      type: SEARCH_ITEMS_SUCCESS,
      payload: itemsData,
    })

    expect(result).toStrictEqual(['old result item', 'result item'])
  })
})
