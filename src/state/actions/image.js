import { addImageActionCreator } from './utils'

export const addImage = addImageActionCreator('ADD_IMAGE', 'STREAM_ASSET_UPLOADED')

export const removeImage = (index) => ({
  type: 'REMOVE_IMAGE',
  payload: {
    index,
    timestamp: (new Date).getTime()
  }
})

export const setImageCaption = (caption) => ({
  type: 'SET_IMAGE_CAPTION',
  payload: {
    caption,
    timestamp: (new Date).getTime()
  }
})

export const setImageStyle = (style) => ({
  type: 'SET_IMAGE_STYLE',
  payload: {
    style,
    timestamp: (new Date).getTime()
  }
})
