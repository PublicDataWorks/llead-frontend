import { combineReducers } from 'redux'

import feedbacksReducer from './feedbacks-reducer'

export default combineReducers({
  sendMessageResponse: feedbacksReducer,
})
