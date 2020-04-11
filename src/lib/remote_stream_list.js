import { db } from './firebase'
import RemoteStream from './remote_stream'

class RemoteStreamList {
  constructor({isFeatured, authorId}) {
    this.isFeatured = isFeatured,
    this.authorId = authorId
  }

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
    let collection = db.collection('streams').orderBy('createdAt', 'desc')

    if(this.isFeatured) {
      collection = collection.where('isFeatured', '==', true)
    }

    if(this.authorId) {
      collection = collection.where('authorId', '==', this.authorId)
    }

    return collection
  }
}

export default RemoteStreamList
