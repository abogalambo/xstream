const functions = require('firebase-functions')
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin')
admin.initializeApp()
const storage = admin.storage()

exports.cleanDeletedMedia = functions.firestore
  .document('streams/{streamsId}')
  .onWrite((change, context) => {
      const previousMediaKeys = mediaKeys(change.before.data())
      const currentMediaKeys = mediaKeys(change.after.data())
      const mediaKeysSet = new Set(currentMediaKeys)
      const deletedMediaKeys = previousMediaKeys.filter(mediaKey => !mediaKeysSet.has(mediaKey))

      const bucket = storage.bucket()
      const deletePromises = deletedMediaKeys.map(mediaKey => bucket.file(mediaKey).delete())

      return Promise.all(deletePromises)
  })

  const mediaKeys = (doc) => {
    if (!doc) return []

    const segments = doc.segments

    const mediaKeys = []
    if(doc.cover && doc.cover.mediaKey) {
      mediaKeys.push(doc.cover.mediaKey)
    }

    segments.forEach(segment => {
      if(segment.audio && segment.audio.mediaKey) {
        mediaKeys.push(segment.audio.mediaKey)
      }

      if(segment.image && segment.image.mediaKey) {
        mediaKeys.push(segment.image.mediaKey)
      }
    })

    return mediaKeys
  }
