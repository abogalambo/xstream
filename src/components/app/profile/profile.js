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
import defaultAvatar from '../../../img/default_avatar.png'

const Profile = () => {
  const dispatch = useDispatch()
  const profile = useSelector(profileSelector)
  const avatarUploadKey = useSelector(avatarUploadKeySelector)
  const profileForServer = useSelector(profileForServerSelector)

  const { name, avatar } = profile

  const addAvatar = (e) => dispatch(addAvatarAction(e, avatarUploadKey))
  const removeAvatar = () => dispatch(removeAvatarAction())

  const saveProfile = (updates) => {
    dispatch(saveProfileAction({
      ...profileForServer,
      ...updates
    }))
  }

  const [oldAvatar, setOldAvatar] = useState(avatar)
  const [formData, setFormData] = useState({ name })
  const handleSubmit = (e) => {
    saveProfile(formData)
    e.preventDefault()
  }

  const onNameChange = (e) => {
    setFormData({
      ...formData,
      name: e.target.value
    })
  }

  useEffect(() => {
    const { mediaKey, isPersisted } = avatar || {}
    const { mediaKey: oldMediaKey } = oldAvatar || {}

    if(mediaKey != oldMediaKey && (isPersisted || !mediaKey)) {
      saveProfile(formData)
      setOldAvatar(avatar)
    }
  }, [avatar])

  return (
    <div className={styles.profile}>
      
      <figure className={styles.avatar}>
        <img src={avatar && avatar.src ? avatar.src : defaultAvatar} />
      </figure>
      
      <ImageInput
        onChange={addAvatar}
        buttonDisplay
        text={''}
      />

      { avatar && avatar.src && (
        <button onClick={removeAvatar}>
          X Remove
        </button>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={(formData || {}).name}
          onChange={onNameChange}
        />
        <input type="submit" value="Save" />
      </form>
    </div>
  )
}

export default Profile
