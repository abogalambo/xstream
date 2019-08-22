export const addImage = (e) => {
  return dispatch => {
    const file = e.target.files[0]
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      dispatch({
        type: 'ADD_IMAGE',
        payload: { src: reader.result }
      })
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
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