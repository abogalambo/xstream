import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Auth from '../../../lib/auth'
import {
  userLoggedIn
} from '../../../state/actions/auth'
import styles from './user_info.css'

const UserInfo = () => {
  const dispatch = useDispatch()
  const auth = new Auth()
  const triggerLoginUI = () => { 
    auth.triggerLogin('#firebaseui-auth-container')
  }

  useEffect(() => {
    auth.onLogin((user) => {
      const { uid, displayName } = user
      dispatch(userLoggedIn({ uid, displayName }))
    })
  }, [])

  return (
    <a
      className={styles.header_navLink}
      onClick={triggerLoginUI}
      href="#"
    >
      Login
    </a>
  )
}

export default UserInfo
