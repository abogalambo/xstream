import { currentUserIdSelector } from './current_user'

export const isProfilePendingSelector = (state) => (state.profile || {}).isPending

export const avatarUploadKeySelector = (state) => {
  const currentUserId = currentUserIdSelector(state)
  return `user_${currentUserId}/avatar`
}

export const profileSelector = (state) => state.profile

export const profileForServerSelector = (state) => {
  const { avatar, handle } = state.profile

  const { mediaKey, isPersisted } = (avatar || {})

  const avatarForServer = isPersisted ? { mediaKey } : undefined

  const result = {
    id: currentUserIdSelector(state),
    avatar: avatarForServer,
    handle
  }

  Object.keys(result).forEach(key => result[key] === undefined && delete result[key])

  return result
}
