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
  const auth = new Auth()
  const dispatch = useDispatch()
  const currentUser = useSelector(currentUserSelector)

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
      onClick={currentUser ? triggerLogout : null}
      href={currentUser ? '/' : '/login'}
    >
      { currentUser ? 'Logout' : 'Login' }
    </a>
  )
}

export default UserInfo
