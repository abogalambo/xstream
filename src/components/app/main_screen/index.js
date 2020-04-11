import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import PrivateRoute from '../../lib/private_route'
import StreamLoader from '../stream_loader'
import StreamListLoader from '../stream_list_loader'
import LoginForm from '../login_form'
import Profile from '../profile'
import ConfirmationDialog from '../confirmation_dialog'
import UserLoader from '../user_loader'
import ProfileLoader from '../profile_loader'
import TopBar from '../top_bar'

const MainScreen = () => {
  return (
    <>
      <ConfirmationDialog />
      <UserLoader />
      <ProfileLoader />
      <Router>
        <Switch>
          <Route exact path={"/:filter(featured|recent)?"}>
            <TopBar />
            <StreamListLoader />
          </Route>
          <PrivateRoute path="/streams/new">
            <StreamLoader page="new" />
          </PrivateRoute>
          <PrivateRoute path="/streams/:id/edit">
            <StreamLoader page="edit" />
          </PrivateRoute>
          <Route path="/streams/:id">
            <StreamLoader page="view" />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <PrivateRoute path="/profile">
            <TopBar />
            <Profile />
          </PrivateRoute>
        </Switch>
      </Router>
    </>
  )
}

export default MainScreen
