import documentsReducer from 'reducers/department-page/documents-reducer'

import { DEPARTMENT_DOCUMENTS_FETCH_SUCCESS } from 'action-types/department-page'

describe('#documentsReducer', () => {
  it('should return initial state', () => {
    expect(documentsReducer(undefined, {})).toStrictEqual({})
  })

  it('should handle DEPARTMENT_DOCUMENTS_FETCH_SUCCESS with no previous', () => {
    const documentsData = {
      next: 'next',
      previous: null,
      count: 1,
      results: ['result item'],
    }

    const result = documentsReducer(['old result item'], {
      type: DEPARTMENT_DOCUMENTS_FETCH_SUCCESS,
      payload: documentsData,
    })

    expect(result).toStrictEqual(['result item'])
  })
  it('should handle DEPARTMENT_DOCUMENTS_FETCH_SUCCESS with previous', () => {
    const documentsData = {
      next: 'next',
      previous: 'previous',
      count: 1,
      results: ['result item'],
    }

    const result = documentsReducer(['old result item'], {
      type: DEPARTMENT_DOCUMENTS_FETCH_SUCCESS,
      payload: documentsData,
    })

    expect(result).toStrictEqual(['old result item', 'result item'])
  })
})
