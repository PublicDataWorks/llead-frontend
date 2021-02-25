import documentsPaginationReducer from 'reducers/department-page/documents-pagination-reducer'

import { DEPARTMENT_DOCUMENTS_FETCH_SUCCESS } from 'action-types/department-page'

describe('#documentsReducer', () => {
  it('should return initial state', () => {
    expect(documentsPaginationReducer(undefined, {})).toStrictEqual({})
  })

  it('should handle DEPARTMENT_DOCUMENTS_FETCH_SUCCESS with empty next', () => {
    const documentsData = {
      next: null,
      previous: null,
      count: 1,
      results: ['result item'],
    }

    const result = documentsPaginationReducer(
      {},
      {
        type: DEPARTMENT_DOCUMENTS_FETCH_SUCCESS,
        payload: documentsData,
      }
    )

    expect(result).toStrictEqual({
      limit: undefined,
      offset: undefined,
      count: 1,
    })
  })
  it('should handle DEPARTMENT_DOCUMENTS_FETCH_SUCCESS with invalid next value', () => {
    const documentsData = {
      next: 'next',
      previous: null,
      count: 1,
      results: ['result item'],
    }

    const result = documentsPaginationReducer(
      {},
      {
        type: DEPARTMENT_DOCUMENTS_FETCH_SUCCESS,
        payload: documentsData,
      }
    )

    expect(result).toStrictEqual({
      limit: null,
      offset: null,
      count: 1,
    })
  })
  it('should handle DEPARTMENT_DOCUMENTS_FETCH_SUCCESS with valid next value', () => {
    const documentsData = {
      next: 'https://url.com/?limit=2&offset=1',
      previous: null,
      count: 1,
      results: ['result item'],
    }

    const result = documentsPaginationReducer(
      {},
      {
        type: DEPARTMENT_DOCUMENTS_FETCH_SUCCESS,
        payload: documentsData,
      }
    )

    expect(result).toStrictEqual({
      limit: 2,
      offset: 1,
      count: 1,
    })
  })
})
