import { addImageActionCreator } from './utils'

export const addImage = addImageActionCreator('ADD_IMAGE')

export const removeImage = () => {
  return {
    type: 'REMOVE_IMAGE'
  }
}

export const setImageCaption = (caption) => {
  return {
    type: 'SET_IMAGE_CAPTION',
    payload: { caption }
  }
}
