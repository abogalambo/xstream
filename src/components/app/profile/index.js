import React from 'react'
import { useSelector } from 'react-redux'
import {
  isProfilePendingSelector
} from '../../../state/selectors/profile'
import Spinner from '../../lib/spinner'
import PlainProfile from './profile'

const Profile = () => {
  const isProfilePending = useSelector(isProfilePendingSelector)

  return isProfilePending ? (
    <Spinner />
  ) : (
    <PlainProfile />
  )
}

export default Profile
