import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import StreamLoader from '../stream_loader'

const MainScreen = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Link to="/streams/new"> Add New Stream </Link>
        </Route>
        <Route path="/streams/new">
          <StreamLoader />
        </Route>
        <Route path="/streams/:id/edit">
          <StreamLoader />
        </Route>
      </Switch>
    </Router>
  )
}

export default MainScreen
