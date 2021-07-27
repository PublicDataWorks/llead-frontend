import { combineReducers } from 'redux'

import appConfigReducer from 'reducers/app-config-reducer'
import departmentPageReducer from 'reducers/department-page'
import forgotPasswordPageReducer from 'reducers/forgot-password-page'
import forgotPasswordConfirmPageReducer from 'reducers/forgot-password-confirm-page'
import frontPageReducer from 'reducers/front-page'
import loginPageReducer from 'reducers/login-page'
import officerPageReducer from 'reducers/officer-page'
import recentItemsReducer from 'reducers/recent-items-reducer'
import searchPageReducer from 'reducers/search-page'
import tokenReducer from 'reducers/token-reducer'
import userInfoReducer from './user-info-reducer'

export default combineReducers({
  appConfig: appConfigReducer,
  departmentPage: departmentPageReducer,
  forgotPasswordPage: forgotPasswordPageReducer,
  forgotPasswordConfirmPage: forgotPasswordConfirmPageReducer,
  frontPage: frontPageReducer,
  loginPage: loginPageReducer,
  officerPage: officerPageReducer,
  recentItems: recentItemsReducer,
  searchPage: searchPageReducer,
  token: tokenReducer,
  userInfo: userInfoReducer,
})
