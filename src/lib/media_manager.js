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
    const promise = ref.put(file, metadata).then(_snapshot => ref.getDownloadURL())

    this._cache[key] = promise
    return promise    
  }

  read(key) {
    if(!this._cache[key]){
      const promise = this._mediaStore.child(key).getDownloadURL()
      this._cache[key] = promise
    }

    return this._cache[key]
  }
}

export default MediaManager
