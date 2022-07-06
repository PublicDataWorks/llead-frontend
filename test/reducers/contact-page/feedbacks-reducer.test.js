import feedbacksReducer from 'reducers/contact-page/feedbacks-reducer'

import {
  SAVE_FEEDBACK_START,
  SAVE_FEEDBACK_SUCCESS,
} from 'action-types/contact-page'

describe('#feedbacksReducer', () => {
  it('returns initial state', () => {
    expect(feedbacksReducer(undefined, {})).toStrictEqual({})
  })

  it('handles SAVE_FEEDBACK_START', () => {
    const result = feedbacksReducer(
      {},
      {
        type: SAVE_FEEDBACK_START,
      }
    )

    expect(result).toStrictEqual({})
  })

  it('handles SAVE_FEEDBACK_SUCCESS', () => {
    const feedback = { id: 1, name: 'feedbacks' }

    const result = feedbacksReducer(
      {},
      {
        type: SAVE_FEEDBACK_SUCCESS,
        payload: feedback,
      }
    )

    expect(result).toStrictEqual(feedback)
  })
})
