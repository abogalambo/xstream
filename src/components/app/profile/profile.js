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
  addAvatar as addAvatarAction
} from '../../../state/actions/profile'
import ImageInput from '../../lib/image_input'

const Profile = () => {
  const dispatch = useDispatch()
  const profile = useSelector(profileSelector)
  const avatarUploadKey = useSelector(avatarUploadKeySelector)
  const profileForServer = useSelector(profileForServerSelector)

  const { handle, avatar } = profile

  const addAvatar = (e) => dispatch(addAvatarAction(e, avatarUploadKey))

  const saveProfile = () => {
    dispatch(saveProfileAction(profileForServer))
  }

  const [oldAvatar, setOldAvatar] = useState(avatar)

  useEffect(() => {
    const { mediaKey, isPersisted } = avatar || {}
    const { mediaKey: oldMediaKey } = oldAvatar || {}

    if(isPersisted && mediaKey != oldMediaKey) {
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
