import { db } from './firebase'
import MediaManager from './media_manager'

class RemoteProfile {
  constructor(profile) {
    this.profile = profile
  }

  save() {
    return (this.profile.id == null) ? (
      this.collection.add(this.profileData)
        .then(docRef => {
          this.profile.id = docRef.id
          return this
        })
    ) : (
      this.collection.doc(this.profile.id)
        .set(this.profileData)
        .then(() => this)
    )
  }

  delete() {
    return this.docRef.delete().then(() => this)
  }

  fetch() {
    return this.docRef.get().then((doc) => {
      if (doc.exists) {
        this.profile = { ...this.profile, ...doc.data() }
        return this.profile.avatar ? this.avatarPromise : this
      } else {
        return Promise.reject(doc)
      }
    })
  }

  get mediaManager() {
    this._mediaManager = this._mediaManager || new MediaManager()

    return this._mediaManager
  }

  get avatarPromise() {
    const { avatar } = this.profile

    return this.mediaManager.read(avatar.mediaKey).then(avatarUrl => {
      avatar.src = avatarUrl
      avatar.isPersisted = true
      return this
    })
  }

  get docRef() {
    return this.collection.doc(this.profile.id)
  }

  get collection() {
    return db.collection('profiles')
  }

  get profileData() {
    const { id, ...rest } = this.profile
    return rest
  }
}

export default RemoteProfile
