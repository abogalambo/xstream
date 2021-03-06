import { db } from './firebase'
import MediaManager from './media_manager'
import RemoteProfile from './remote_profile'

class RemoteStream {
  constructor(stream) {
    this.stream = stream
  }

  save() {
    return (this.stream.id == null) ? (
      this.collection.add(this.streamData)
        .then(docRef => {
          this.stream.id = docRef.id
          return this
        })
    ) : (
      this.collection.doc(this.stream.id)
        .set(this.streamData)
        .then(() => this)
    )
  }

  publish() {
    const update = { publishedAt: (new Date).getTime() }
    return this.collection.doc(this.stream.id)
      .set(update, {
        merge: true
      })
      .then(() => {
        this.stream = {
          ...this.stream,
          ...update
        }

        return this
      })
  }

  delete() {
    return this.docRef.delete().then(() => this)
  }

  fetch() {
    return this.docRef.get().then((doc) => {
      if (doc.exists) {
        this.stream = { ...this.stream, ...doc.data() }
        return this.fullPromise
      } else {
        return Promise.reject(doc)
      }
    })
  }

  get mediaManager() {
    this._mediaManager = this._mediaManager || new MediaManager()

    return this._mediaManager
  }

  get fullPromise() {
    return Promise.all([
      this.authorPromise,
      this.mediaUrlsPromise
    ]).then(() => this)
  }

  get compactPromise() {
    return Promise.all([
      this.authorPromise,
      this.coverPromise
    ]).then(() => this)
  }

  get coverPromise() {
    const { cover } = this.stream

    if(!cover || !cover.mediaKey) {
      return Promise.resolve()
    }

    return this.mediaManager.read(cover.mediaKey).then(coverUrl => {
      cover.src = coverUrl
      cover.isPersisted = true
    })
  }

  get authorPromise() {
    const { authorId } = this.stream

    return new RemoteProfile({id: authorId})
      .fetch()
      .then((remoteProfile) => {
        const { name, avatar } = remoteProfile.profile
        const { src } = avatar || {}
        this.stream.author = { name, avatar: { src } }

        return this
      })
      .catch(() => this)
  }

  get mediaUrlsPromise() {
    if(!this._mediaUrlsPromise){
      const { cover, segments } = this.stream
      const promises = []

      if(cover) {
        promises.push(this.coverPromise)
      }

      segments.forEach(segment => {
        const { image, audio } = segment

        if(image) {
          const imagePromise = this.mediaManager.read(image.mediaKey).then(imageUrl => {
            image.src = imageUrl
            image.isPersisted = true
          })

          promises.push(imagePromise)
        }

        if(audio) {
          const audioPromise = this.mediaManager.read(audio.mediaKey).then(audioUrl => {
            audio.url = audioUrl
            audio.isPersisted = true
          })

          promises.push(audioPromise)
        }
      })

      this._mediaUrlsPromise = Promise.all(promises).then(() => this)
    }

    return this._mediaUrlsPromise
  }

  get docRef() {
    return this.collection.doc(this.stream.id)
  }

  get collection() {
    return db.collection('streams')
  }

  get streamData() {
    const { id, ...rest } = this.stream
    return rest
  }
}

export default RemoteStream
