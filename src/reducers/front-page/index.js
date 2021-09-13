import { combineReducers } from 'redux'

import analyticSummaryReducer from './analytic-summary-reducer'
import departmentsReducer from './departments-reducer'
import officersReducer from './officers-reducer'
import documentsReducer from './documents-reducer'
import newsArticlesReducer from './news-articles-reducer'

export default combineReducers({
  analyticSummary: analyticSummaryReducer,
  departments: departmentsReducer,
  officers: officersReducer,
  documents: documentsReducer,
  newsArticles: newsArticlesReducer,
})
