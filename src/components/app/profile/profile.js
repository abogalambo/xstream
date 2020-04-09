import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './profile.css'
import {
  profileSelector,
  avatarUploadKeySelector,
  profileForServerSelector,
  hasUnsavedChangesSelector
} from '../../../state/selectors/profile'
import {
  saveProfile as saveProfileAction,
  addAvatar as addAvatarAction,
  removeAvatar as removeAvatarAction,
  setProfileName as setProfileNameAction
} from '../../../state/actions/profile'
import ImageInput from '../../lib/image_input'
import Avatar from '../../lib/avatar'

const Profile = () => {
  const dispatch = useDispatch()
  const profile = useSelector(profileSelector)
  const avatarUploadKey = useSelector(avatarUploadKeySelector)
  const profileForServer = useSelector(profileForServerSelector)
  const hasUnsavedChanges = useSelector(hasUnsavedChangesSelector)

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
        <Avatar src={(avatar || {}).src} size="large" />
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
           onClick={removeAvatar}>Remove
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <label className={styles.form_label}
          htmlFor='displayName'>Name
          <input className={styles.form_input}
            pattern ={"^[a-zA-Z][^#&<>\"~;$^%{}?]{1,30}$"}
            title="Name can only contain alphanumeric characters and spaces"
            maxLength="30"
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
         <input className={styles.form_submitBtn}
          disabled={!hasUnsavedChanges}
          type="submit"
          value="Save"
        />
      </form>
    </div>
  )
}

export default Profile
