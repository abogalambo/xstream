import React from "react"
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Route,
  Redirect,
} from "react-router-dom"
import {
  isUserLoggedInSelector,
  isUserLoggedOutSelector,
  isUserPendingSelector
} from '../../../state/selectors/current_user'
import Spinner from '../spinner'

const PrivateRoute = ({ children, ...rest }) => {
  const isUserPending = useSelector(isUserPendingSelector)
  const isUserLoggedIn = useSelector(isUserLoggedInSelector)
  const isUserLoggedOut = useSelector(isUserLoggedOutSelector)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        <>
          {isUserPending && (
            <Spinner />
          )}

          {isUserLoggedIn && (
            children
          )}

          {isUserLoggedOut && (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )}
        </>
      }
    />
  )
}

PrivateRoute.propTypes = {
  children: PropTypes.element
}

export default PrivateRoute
