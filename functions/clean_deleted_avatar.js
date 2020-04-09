const { functions, storage } = require('./common')

exports.cleanDeletedAvatar = functions.firestore
  .document('profiles/{uid}')
  .onWrite((change, context) => {
    const oldMediaKey = avatarMediaKey(change.before.data())
    const newMediaKey = avatarMediaKey(change.after.data())
    
    if(oldMediaKey && !newMediaKey) {
      const bucket = storage.bucket()
      return bucket.file(oldMediaKey).delete()
    }

    return Promise.resolve()
  })

const avatarMediaKey = (doc) => {
  const { avatar } = doc || {}
  const { mediaKey } = avatar || {}
  
  return mediaKey
}
