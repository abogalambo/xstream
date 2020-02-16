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
  payload: new RemoteStream({id}).delete().then(() => ({
    streamId: id
  }))
})

export const newStream = ({uid}) => ({
  type: 'NEW_STREAM',
  payload: {
    uid,
    timestamp: (new Date).getTime()
  }
})

export const setStreamTitle = (title) => ({
  type: 'SET_STREAM_TITLE',
  payload: {
    title,
    timestamp: (new Date).getTime()
  }
})

export const playStream = () => ({
  type: 'PLAY_STREAM'
})

export const addCoverImage = addImageActionCreator('ADD_COVER_IMAGE')

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

export const addSegment = () => ({
  type: 'ADD_SEGMENT',
  payload: {
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
