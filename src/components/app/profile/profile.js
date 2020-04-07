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
  removeAvatar as removeAvatarAction,
  setProfileName as setProfileNameAction
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

  const saveProfile = () => {
    dispatch(saveProfileAction(profileForServer))
  }

  const [oldAvatar, setOldAvatar] = useState(avatar)
  const handleSubmit = (e) => {
    saveProfile()
    e.preventDefault()
  }

  const setProfileName = (e) => {
    dispatch(setProfileNameAction(e.target.value))
  }

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
      <div className={styles.avatarWrapper}>
        <figure className={styles.avatar}>
          <img src={avatar && avatar.src ? avatar.src : defaultAvatar} />
        </figure>
        <div className={styles.imageInputWrapper}>
          <ImageInput
            onChange={addAvatar}
            buttonDisplay
            text={''}
            isLightIcon={true}
          />
         </div>

        { avatar && avatar.src && (
          <button className={styles.avatar_RemoveBtn}
           onClick={removeAvatar}>
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='displayName'>Name
          <input
            id="displayName"
            autoComplete="on"
            autoCorrect="on"
            placeholder="Add your name"
            spellCheck="true"
            type="text"
            value={name}
            onChange={setProfileName}
          />
        </label>
         <input type="submit" value="Save" />
      </form>
    </div>
  )
}

export default Profile
