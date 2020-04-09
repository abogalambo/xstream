import React from 'react'
import { useSelector } from 'react-redux'
import Auth from '../../../lib/auth'
import {
  currentUserSelector
} from '../../../state/selectors/current_user'
import {
  profileSelector
} from '../../../state/selectors/profile'
import Avatar from '../../lib/avatar'
import styles from './user_info.css'

const UserInfo = () => {
  const auth = new Auth()
  const currentUser = useSelector(currentUserSelector)
  const profile = useSelector(profileSelector) || {}
  const { src } = profile.avatar || {}

  const triggerLogout = () => { 
    auth.triggerLogout()
  }

  return (
    <div className={styles.userInfo}>
      <a
        className={styles.avatar}
        href="/profile"
      >
        <Avatar src={src} size="small" />
      </a>
      <a
        className={styles.header_navLink}
        onClick={currentUser ? triggerLogout : null}
        href={currentUser ? '/' : '/login'}
      >
        { currentUser ? 'Logout' : 'Login' }
      </a>
    </div>
  )
}

export default UserInfo
