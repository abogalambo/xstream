import RemoteProfile from '../../lib/remote_profile'

export const fetchProfile = (uid) => ({
  type: 'FETCH_PROFILE',
  payload: new RemoteProfile({id: uid}).fetch().then(remoteProfile => ({
    profile: remoteProfile.profile
  }))
})

export const saveProfile = (profileData) => ({
  type: 'SAVE_PROFILE',
  payload: new RemoteProfile(profileData).save().then(remoteProfile => ({
    profile: remoteProfile.profile
  }))
})
