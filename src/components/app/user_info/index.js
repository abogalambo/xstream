import React, { useEffect, useState } from 'react'
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
  const [showLoginUi, setShowLoginUi] = useState(false)

  const triggerLoginUI = () => {
    setShowLoginUi(true)
    auth.triggerLogin('#firebaseui-auth-container')
  }

  const triggerLogout = () => { 
    auth.triggerLogout()
  }

  const handleCancel = () => {
    setShowLoginUi(false)
  }

  useEffect(() => {
    auth.onLogin((user) => {
      const { uid, displayName } = user
      dispatch(userLoggedIn({ uid, displayName }))
    })

    auth.onLogout(() => {
      dispatch(userLoggedOut())
    })

    if (auth.isPendingRedirect()) {
      triggerLoginUI()
    }
  }, [])

  return (
    <>
      <a
        className={styles.header_navLink}
        onClick={currentUser ? triggerLogout : triggerLoginUI}
        href="#"
      >
        { currentUser ? 'Logout' : 'Login' }
      </a>

      <div className={showLoginUi ? '' : styles.hidden}>
        <div 
          className={styles.scrim}
          onClick={handleCancel}
        ></div>
        <div
          className={styles.container}
          id="firebaseui-auth-container"
        >
        </div>
      </div>
    </>
  )
}

export default UserInfo
