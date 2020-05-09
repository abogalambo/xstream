import { addImageActionCreator } from './utils'
import RemoteStream from '../../lib/remote_stream'

export const fetchStream = (id, page) => ({
  type: 'FETCH_STREAM',
  payload: new RemoteStream({id}).fetch().then(remoteStream => ({
    streamData: remoteStream.stream,
    page
  }))
})

export const deleteStream = (id) => ({
  type: 'DELETE_STREAM',
  payload: {
    promiseFunction: () => {
      return (new RemoteStream({id}))
        .delete()
        .then(() => ({ streamId: id }))
    },
    isConfirmationNeeded: true
  }
})

export const newStream = ({uid}) => ({
  type: 'NEW_STREAM',
  payload: {
    uid,
    timestamp: (new Date).getTime()
  }
})

export const exitStream = () => ({
  type: 'EXIT_STREAM'
})

export const publishStream = (id) => ({
  type: 'PUBLISH_STREAM',
  payload: {
    promiseFunction: () => {
      return (new RemoteStream({id}))
        .publish()
        .then((remoteStream) => ({
          timestamp: remoteStream.stream.publishedAt 
        }))
    },
    isConfirmationNeeded: true
  }
})

export const setStreamTitle = (title) => ({
  type: 'SET_STREAM_TITLE',
  payload: {
    title,
    timestamp: (new Date).getTime()
  }
})

export const addCoverImage = addImageActionCreator('ADD_COVER_IMAGE', 'STREAM_ASSET_UPLOADED')

export const removeCoverImage = () => ({
  type: 'REMOVE_COVER_IMAGE',
  payload: {
    timestamp: new Date().getTime()
  }
})

export const goToSegment = (index) => ({
  type: 'GO_TO_SEGMENT',
  payload: { index }
})

export const addSegment = (index) => ({
  type: 'ADD_SEGMENT',
  payload: {
    index,
    timestamp: (new Date).getTime()
  }
})

export const removeSegment = (index) => ({
  type: 'REMOVE_SEGMENT',
  payload: {
    index,
    isConfirmationNeeded: true,
    timestamp: (new Date).getTime()
  }
})

export const reorderSegments = (oldIndex, newIndex) => ({
  type: 'REORDER_SEGMENTS',
  payload: {
    oldIndex,
    newIndex,
    timestamp: (new Date).getTime()
  }
})

export const segmentEnded = () => ({
  type: 'SEGMENT_ENDED',
  payload: {
    timestamp: (new Date).getTime()
  }
})

export const toggleMode = () => ({
  type: 'TOGGLE_MODE'
})

export const startTyping = () => ({
  type: 'START_TYPING'
})

export const stopTyping = () => ({
  type: 'STOP_TYPING'
})
