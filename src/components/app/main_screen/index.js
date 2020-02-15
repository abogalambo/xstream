import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import StreamLoader from '../stream_loader'
import StreamListLoader from '../stream_list_loader'
import ConfirmationDialog from '../confirmation_dialog'
import TopBar from '../top_bar'

const MainScreen = () => {
  return (
    <>
      <ConfirmationDialog />
      <Router>
        <Switch>
          <Route exact path="/">
            <TopBar />
            <StreamListLoader />
          </Route>
          <Route path="/streams/new">
            <StreamLoader page="new" />
          </Route>
          <Route path="/streams/:id/edit">
            <StreamLoader page="edit" />
          </Route>
          <Route path="/streams/:id">
            <StreamLoader page="view" />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default MainScreen
