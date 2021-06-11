import { combineReducers } from 'redux'

import loginPageReducer from 'reducers/login-page'
import departmentPageReducer from 'reducers/department-page'
import officerPageReducer from 'reducers/officer-page'
import tokenReducer from 'reducers/token-reducer'
import appConfigReducer from 'reducers/app-config-reducer'
import frontPageReducer from 'reducers/front-page'
import searchPageReducer from 'reducers/search-page'
import recentItemsReducer from 'reducers/recent-items-reducer'
import userInfoReducer from './user-info-reducer'

export default combineReducers({
  token: tokenReducer,
  userInfo: userInfoReducer,
  appConfig: appConfigReducer,
  loginPage: loginPageReducer,
  departmentPage: departmentPageReducer,
  officerPage: officerPageReducer,
  frontPage: frontPageReducer,
  searchPage: searchPageReducer,
  recentItems: recentItemsReducer,
})
