import { combineReducers } from 'redux'

import departmentReducer from './department-reducer'
import isRequestingReducer from './is-requesting-reducer'
import featuredOfficersReducer from './featured-officers-reducer'
import featuredDocumentsReducer from './featured-documents-reducer'
import featuredNewsArticlesReducer from './featured-news-articles-reducer'
import datasetsReducer from './datasets-reducer'

export default combineReducers({
  department: departmentReducer,
  isRequesting: isRequestingReducer,
  featuredOfficers: featuredOfficersReducer,
  featuredDocuments: featuredDocumentsReducer,
  featuredNewsArticles: featuredNewsArticlesReducer,
  datasets: datasetsReducer,
})
