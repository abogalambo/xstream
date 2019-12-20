import { mediaStore } from './firebase'

let instance = null

class MediaManager {
  constructor() {
    if(instance){
      return instance
    }

    instance = this
    this._cache = {}
    this._mediaStore = mediaStore
  }

  write(key, file) {
    const { type, size } = file
    const metadata = { type, size }
    const ref = this._mediaStore.child(key)
    const uploadPromise = ref.put(file, metadata)
    const urlPromise = uploadPromise.then(() => ref.getDownloadURL())

    uploadPromise.then(() => {
      this._cache[key].state = 'uploaded'
    })

    this._cache[key] = { uploadPromise, urlPromise, state: 'uploading' }
    return urlPromise
  }

  read(key) {
    if(!this._cache[key]){
      const urlPromise = this._mediaStore.child(key).getDownloadURL()
      this._cache[key] = { urlPromise, state: 'uploaded' }
    }

    return this._cache[key].urlPromise
  }

  delete(key) {
    if(this._cache[key] && this._cache[key].state == 'uploading') {
      this._cache[key].uploadPromise.cancel()
    } else {
      this._mediaStore.child(key).delete()
    }

    delete this._cache[key]
  }
}

export default MediaManager
