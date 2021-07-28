import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import smoothscroll from 'smoothscroll-polyfill'

import App from './app'
import store from './store'

smoothscroll.polyfill()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
