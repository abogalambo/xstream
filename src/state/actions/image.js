export const addImage = (src) => {
  return {
    type: 'ADD_IMAGE',
    payload: { src }
  }
}

export const removeImage = () => {
  return {
    type: 'REMOVE_IMAGE'
  }
}

export const addImageCaption = (caption) => {
  return {
    type: 'ADD_IMAGE_CAPTION',
    payload: { caption }
  }
}

export const removeImageCaption = () => {
  return {
    type: 'REMOVE_IMAGE_CAPTION'
  }
}
