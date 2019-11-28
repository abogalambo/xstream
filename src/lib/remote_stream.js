import { db } from './firebase'

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
