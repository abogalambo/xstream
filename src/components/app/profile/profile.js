import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './profile.css'
import {
  profileSelector,
  avatarUploadKeySelector,
  profileForServerSelector
} from '../../../state/selectors/profile'
import {
  saveProfile as saveProfileAction,
  addAvatar as addAvatarAction,
  removeAvatar as removeAvatarAction
} from '../../../state/actions/profile'
import ImageInput from '../../lib/image_input'

const Profile = () => {
  const dispatch = useDispatch()
  const profile = useSelector(profileSelector)
  const avatarUploadKey = useSelector(avatarUploadKeySelector)
  const profileForServer = useSelector(profileForServerSelector)

  const { handle, avatar } = profile

  const addAvatar = (e) => dispatch(addAvatarAction(e, avatarUploadKey))
  const removeAvatar = () => dispatch(removeAvatarAction())

  const saveProfile = () => {
    dispatch(saveProfileAction(profileForServer))
  }

  const [oldAvatar, setOldAvatar] = useState(avatar)

  useEffect(() => {
    const { mediaKey, isPersisted } = avatar || {}
    const { mediaKey: oldMediaKey } = oldAvatar || {}

    if(mediaKey != oldMediaKey && (isPersisted || !mediaKey)) {
      saveProfile()
      setOldAvatar(avatar)
    }
  }, [avatar])

  return (
    <div className={styles.profile}>
      {avatar && avatar.src && (
        <img src={avatar.src} />
      )}
      <ImageInput
        onChange={addAvatar}
        buttonDisplay
        text={''}
      />
      <button onClick={removeAvatar}>
        Remove Avatar
      </button>
      <input
        type="text"
        defaultValue={handle}
      />
      <button onClick={saveProfile}>
        Save
      </button>
    </div>
  )
}

export default Profile
