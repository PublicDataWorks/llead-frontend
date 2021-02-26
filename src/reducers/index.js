import { combineReducers } from 'redux'

import loginPageReducer from 'reducers/login-page'
import departmentPageReducer from 'reducers/department-page'
import tokenReducer from 'reducers/token-reducer'
import appConfigReducer from 'reducers/app-config-reducer'
import frontPageReducer from 'reducers/front-page'
import searchPageReducer from 'reducers/search-page'

export default combineReducers({
  token: tokenReducer,
  appConfig: appConfigReducer,
  loginPage: loginPageReducer,
  departmentPage: departmentPageReducer,
  frontPage: frontPageReducer,
  searchPage: searchPageReducer,
})
