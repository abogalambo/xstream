import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Auth from '../../../lib/auth'
import {
  userLoggedIn,
  userLoggedOut
} from '../../../state/actions/auth'
import {
  currentUserSelector
} from '../../../state/selectors/current_user'
import styles from './user_info.css'

const UserInfo = () => {
  const dispatch = useDispatch()
  const auth = new Auth()
  const currentUser = useSelector(currentUserSelector)

  const triggerLoginUI = () => { 
    auth.triggerLogin('#firebaseui-auth-container')
  }

  const triggerLogout = () => { 
    auth.triggerLogout()
  }

  useEffect(() => {
    auth.onLogin((user) => {
      const { uid, displayName } = user
      dispatch(userLoggedIn({ uid, displayName }))
    })

    auth.onLogout(() => {
      dispatch(userLoggedOut())
    })
  }, [])

  return (
    <a
      className={styles.header_navLink}
      onClick={currentUser ? triggerLogout : triggerLoginUI}
      href="#"
    >
      { currentUser ? 'Logout' : 'Login' }
    </a>
  )
}

export default UserInfo
