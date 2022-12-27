import { combineReducers } from 'redux'

import departmentReducer from './department-reducer'
import isRequestingReducer from './is-requesting-reducer'
import featuredOfficersReducer from './featured-officers-reducer'
import featuredDocumentsReducer from './featured-documents-reducer'
import featuredNewsArticlesReducer from './featured-news-articles-reducer'
import datasetsReducer from './datasets-reducer'
import searchItemsReducer from './search-items-reducer'
import searchItemsPaginationReducer from './search-items-pagination-reducer'
import departmentMigratoryDataReducer from './department-migratory-data-reducer'

export default combineReducers({
  department: departmentReducer,
  isRequesting: isRequestingReducer,
  featuredOfficers: featuredOfficersReducer,
  featuredDocuments: featuredDocumentsReducer,
  featuredNewsArticles: featuredNewsArticlesReducer,
  datasets: datasetsReducer,
  searchItems: searchItemsReducer,
  searchItemsPagination: searchItemsPaginationReducer,
  departmentMigratoryData: departmentMigratoryDataReducer,
})
