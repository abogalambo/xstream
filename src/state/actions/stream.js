import { addImageActionCreator } from './utils'

export const newStream = () => ({
  type: 'NEW_STREAM'
})

export const setStreamTitle = (title) => ({
  type: 'SET_STREAM_TITLE',
  payload: { title }
})

export const addCoverImage = addImageActionCreator('ADD_COVER_IMAGE')

export const removeCoverImage = () => ({
  type: 'REMOVE_COVER_IMAGE'
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
  payload: { index }
})

export const segmentEnded = () => ({
  type: 'SEGMENT_ENDED'
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
