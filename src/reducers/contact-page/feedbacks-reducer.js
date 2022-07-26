import {
  SAVE_FEEDBACK_START,
  SAVE_FEEDBACK_SUCCESS,
} from 'action-types/contact-page'
import { handleActions } from 'redux-actions'

export default handleActions(
  {
    [SAVE_FEEDBACK_START]: () => {},
    [SAVE_FEEDBACK_SUCCESS]: (state, action) => action.payload,
  },
  {}
)
