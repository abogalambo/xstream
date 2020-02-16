import React, { useEffect } from 'react'
import Auth from '../../../lib/auth'
import styles from './login_form.css'

const LoginForm = () => {
  const auth = new Auth()

  useEffect(() => {
    auth.triggerLogin('#firebaseui-auth-container')    
  }, [])

  return (
    <div className={styles.loginForm} id="firebaseui-auth-container"></div>
  )
}

export default LoginForm
