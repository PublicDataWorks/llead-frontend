import timelineReducer from 'reducers/officer-page/timeline-reducer'

import {
  OFFICER_TIMELINE_FETCH_START,
  OFFICER_TIMELINE_FETCH_SUCCESS,
} from 'action-types/officer-page'

describe('#timelineReducer', () => {
  it('should return initial state', () => {
    expect(timelineReducer(undefined, {})).toStrictEqual([])
  })

  it('should handle OFFICER_TIMELINE_FETCH_START', () => {
    const result = timelineReducer([], {
      type: OFFICER_TIMELINE_FETCH_START,
    })

    expect(result).toStrictEqual([])
  })

  it('should handle OFFICER_TIMELINE_FETCH_SUCCESS', () => {
    const timelineData = ['milestone 1', 'milestone 2']

    const result = timelineReducer(
      {},
      {
        type: OFFICER_TIMELINE_FETCH_SUCCESS,
        payload: timelineData,
      }
    )

    expect(result).toStrictEqual(timelineData)
  })
})
