import * as actionTypes from 'action-types/contact-page'
import { post } from 'utils/api'
import { FEEDBACKS_API_URL } from 'constants/api'

export const saveFeedback = (items) =>
  post(
    [
      actionTypes.SAVE_FEEDBACK_START,
      actionTypes.SAVE_FEEDBACK_SUCCESS,
      actionTypes.SAVE_FEEDBACK_FAILURE,
    ],
    FEEDBACKS_API_URL
  )(items)
