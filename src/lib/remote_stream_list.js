import { db } from './firebase'
import RemoteStream from './remote_stream'

class RemoteStreamList {
  fetch() {
    return this.collection.get().then(snapshot => {
      let coverPromises = []

      this.streamList = snapshot.docs.map(doc => {
        const { id } = doc
        const { cover, title } = doc.data()
        const stream = { id, cover, title }

        if(cover) coverPromises.push(new RemoteStream(stream).coverPromise)

        return stream
      })

      return Promise.all(coverPromises).then(() => this)
    })
  }

  get collection() {
    return db.collection('streams')
  }
}

export default RemoteStreamList
