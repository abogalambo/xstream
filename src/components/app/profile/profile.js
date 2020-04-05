import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './profile.css'
import {
  profileSelector
} from '../../../state/selectors/profile'
import {
  currentUserIdSelector
} from '../../../state/selectors/current_user'
import {
  saveProfile as saveProfileAction
} from '../../../state/actions/profile'

const Profile = () => {
  const dispatch = useDispatch()
  const profile = useSelector(profileSelector)

  const currentUserId = useSelector(currentUserIdSelector)
  const [localProfile, setLocalProfile] = useState(profile)

  useEffect(() => {
    setLocalProfile(profile)
  }, [profile])

  const { handle, avatar } = localProfile
  const onHandleChange = (e) => {
    setLocalProfile({
      ...localProfile,
      handle: e.target.value
    })
  }

  const saveProfile = () => {
    dispatch(saveProfileAction({
      id: currentUserId,
      ...localProfile
    }))
  }

  return (
    <div className={styles.profile}>
      <input
        type="text"
        value={handle}
        onChange={onHandleChange}
      />
      <button onClick={saveProfile}>
        Save
      </button>
    </div>
  )
}

export default Profile
