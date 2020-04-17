import { db } from './firebase'
import RemoteStream from './remote_stream'

class RemoteStreamList {
  constructor({isFeatured, isDraft, isPublished, authorId, orderBy}) {
    this.isFeatured = isFeatured
    this.isDraft = isDraft
    this.isPublished = isPublished
    this.authorId = authorId
    this.orderBy = orderBy
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
    let collection = db.collection('streams')

    if(this.orderBy) {
      collection = collection.orderBy(this.orderBy, 'desc')
    }

    if(this.isDraft) {
      collection = collection.where('publishedAt', '==', null)
    }

    if(this.isPublished) {
      collection = collection.where('publishedAt', '<=', (new Date).getTime())
    }

    if(this.isFeatured) {
      collection = collection.where('isFeatured', '==', true)
    }

    if(this.authorId) {
      collection = collection.where('authorId', '==', this.authorId)
    }

    if(this.isDraft) {
      collection = collection.where('publishedAt', '==', null)
    }

    return collection
  }
}

export default RemoteStreamList
