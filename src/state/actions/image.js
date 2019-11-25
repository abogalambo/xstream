import { addImageActionCreator } from './utils'

export const addImage = addImageActionCreator('ADD_IMAGE')

export const removeImage = () => ({
  type: 'REMOVE_IMAGE',
  payload: {
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
