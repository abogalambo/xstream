import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  currentUserIdSelector
} from '../../../state/selectors/current_user'
import {
  fetchProfile
} from '../../../state/actions/profile'

const ProfileLoader = () => {
  const currentUserId = useSelector(currentUserIdSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    if(currentUserId) {
      dispatch(fetchProfile(currentUserId))
    }
  }, [currentUserId])

  return null
}

export default ProfileLoader
