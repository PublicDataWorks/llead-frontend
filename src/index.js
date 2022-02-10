import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import smoothscroll from 'smoothscroll-polyfill'
import Modal from 'react-modal'

import App from './app'
import store from './store'

smoothscroll.polyfill()

Modal.setAppElement('#root')

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
