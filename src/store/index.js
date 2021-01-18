import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'

import config from 'config'
import rootReducer from 'reducers'
import localStorageConfig from 'store/local-storage-config'

const middlewares = [thunk]

const composeArgs = [
  applyMiddleware(...middlewares),
  persistState(() => {}, localStorageConfig),
]

/* istanbul ignore next */
if (config.appEnv === 'dev') {
  composeArgs.push(
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
}

const store = createStore(rootReducer, compose(...composeArgs))

export default store
