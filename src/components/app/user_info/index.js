import React from 'react'
import { useSelector } from 'react-redux'
import Auth from '../../../lib/auth'
import {
  currentUserSelector
} from '../../../state/selectors/current_user'
import styles from './user_info.css'

const UserInfo = () => {
  const auth = new Auth()
  const currentUser = useSelector(currentUserSelector)

  const triggerLogout = () => { 
    auth.triggerLogout()
  }

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
