import { combineReducers } from 'redux'

import analyticSummaryReducer from './analytic-summary-reducer'
import departmentsReducer from './departments-reducer'
import officersReducer from './officers-reducer'
import documentsReducer from './documents-reducer'
import newsArticlesReducer from './news-articles-reducer'
import frontPageOrdersReducer from './front-page-orders-reducer'
import frontPageCardsReducer from './front-page-cards-reducer'
import migratoryDataReducer from './migratory-data-reducer'
import mapCurrentIndexReducer from './map-current-index-reducer'

export default combineReducers({
  analyticSummary: analyticSummaryReducer,
  departments: departmentsReducer,
  officers: officersReducer,
  documents: documentsReducer,
  newsArticles: newsArticlesReducer,
  frontPageOrders: frontPageOrdersReducer,
  frontPageCards: frontPageCardsReducer,
  migratoryData: migratoryDataReducer,
  mapCurrentIndex: mapCurrentIndexReducer,
})
