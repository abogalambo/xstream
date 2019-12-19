import { db } from './firebase'
import MediaManager from './media_manager'

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

  fetch() {
    return this.docRef.get().then((doc) => {
      if (doc.exists) {
        this.stream = { ...this.stream, ...doc.data() }
        return this.mediaUrlsPromise
      } else {
        return Promise.reject(doc)
      }
    })
  }

  get mediaUrlsPromise() {
    if(!this._mediaUrlsPromise){
      const mediaManager = new MediaManager()
      const { cover, segments } = this.stream
      const promises = []

      if(cover) {
        const coverPromise = mediaManager.read(cover.mediaKey).then(coverUrl => {
          cover.src = coverUrl
          cover.isPersisted = true
        })

        promises.push(coverPromise)
      }

      segments.forEach(segment => {
        const { image, audio } = segment

        if(image) {
          const imagePromise = mediaManager.read(image.mediaKey).then(imageUrl => {
            image.src = imageUrl
            image.isPersisted = true
          })

          promises.push(imagePromise)
        }

        if(audio) {
          const audioPromise = mediaManager.read(audio.mediaKey).then(audioUrl => {
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
