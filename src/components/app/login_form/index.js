import React, { useEffect } from 'react'
import { useLocation } from "react-router-dom"
import Auth from '../../../lib/auth'
import styles from './login_form.css'

const LoginForm = () => {
  const auth = new Auth()
  const query = new URLSearchParams(useLocation().search)
  const signInSuccessUrl = query.get('signInSuccessUrl')

  useEffect(() => {
    auth.triggerLogin(
      '#firebaseui-auth-container',
      signInSuccessUrl || '/'
    )
  }, [])

  return (
    <div className={styles.loginForm} id="firebaseui-auth-container"></div>
  )
}

export default LoginForm
