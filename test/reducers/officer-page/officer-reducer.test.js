import officerReducer from 'reducers/officer-page/officer-reducer'

import {
  OFFICER_FETCH_START,
  OFFICER_FETCH_SUCCESS,
  CLEAR_OFFICER,
} from 'action-types/officer-page'

describe('#officerReducer', () => {
  it('should return initial state', () => {
    expect(officerReducer(undefined, {})).toStrictEqual({})
  })

  it('should handle OFFICER_FETCH_START', () => {
    const result = officerReducer(
      { id: 1 },
      {
        type: OFFICER_FETCH_START,
      }
    )

    expect(result).toStrictEqual({})
  })

  it('should handle OFFICER_FETCH_SUCCESS', () => {
    const officerData = { id: 1, name: 'officer name' }

    const result = officerReducer(
      {},
      {
        type: OFFICER_FETCH_SUCCESS,
        payload: officerData,
      }
    )

    expect(result).toStrictEqual(officerData)
  })

  it('should handle CLEAR_OFFICER', () => {
    const result = officerReducer(
      { id: 1 },
      {
        type: CLEAR_OFFICER,
      }
    )

    expect(result).toStrictEqual({})
  })
})
