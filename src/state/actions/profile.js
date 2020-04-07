import RemoteProfile from '../../lib/remote_profile'
import { addImageActionCreator } from './utils'

export const fetchProfile = (uid) => ({
  type: 'FETCH_PROFILE',
  payload: new RemoteProfile({id: uid})
    .fetch()
    .then(remoteProfile => ({
      profile: remoteProfile.profile
    }))
    .catch((e) => {
      if(e.exists === false){
        return { profile: {} }
      }
    })
})

export const saveProfile = (profileData) => ({
  type: 'SAVE_PROFILE',
  payload: new RemoteProfile(profileData).save().then(remoteProfile => ({
    profile: remoteProfile.profile
  }))
})

export const addAvatar = addImageActionCreator('ADD_AVATAR', 'PROFILE_ASSET_UPLOADED')

export const removeAvatar = () => ({
  type: 'REMOVE_AVATAR'
})

export const setProfileName = (name) => ({
  type: 'SET_PROFILE_NAME',
  payload: {
    name
  }
})
