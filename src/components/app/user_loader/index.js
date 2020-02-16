import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Auth from '../../../lib/auth'
import {
  userLoggedIn,
  userLoggedOut
} from '../../../state/actions/auth'

const UserLoader = () => {
  const auth = new Auth()
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onLogin((user) => {
      const { uid, displayName } = user
      dispatch(userLoggedIn({ uid, displayName }))
    })

    auth.onLogout(() => {
      dispatch(userLoggedOut())
    })
  }, [])

  return null
}

export default UserLoader
