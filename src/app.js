import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import DocumentPage from 'pages/document-page'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/documents/:id">
          <DocumentPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
