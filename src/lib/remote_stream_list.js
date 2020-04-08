import { db } from './firebase'
import RemoteStream from './remote_stream'

class RemoteStreamList {
  fetch() {
    return this.collection.get().then(snapshot => {
      let compactPromises = []

      this.streamList = snapshot.docs.map(doc => {
        const { id } = doc
        const { cover, title, authorId } = doc.data()
        const stream = { id, authorId, cover, title }

        compactPromises.push(new RemoteStream(stream).compactPromise)

        return stream
      })

      return Promise.all(compactPromises).then(() => this)
    })
  }

  get collection() {
    return db.collection('streams')
  }
}

export default RemoteStreamList
