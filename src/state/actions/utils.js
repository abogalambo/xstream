import MediaManager from '../../lib/media_manager'

export const addImageActionCreator = (type, assetUploadedType) => (
  (event, uploadKey, other) => {
    return dispatch => {
      const file = event.target.files[0]
      const reader = new FileReader()

      reader.addEventListener("load", () => {
        dispatch({
          type,
          payload: {
            src: reader.result,
            mediaKey: uploadKey,
            ...other
          }
        })
      }, false);

      if (file) {
        (new MediaManager()).write(uploadKey, file).then(imageUrl => {
          dispatch({
            type: assetUploadedType,
            payload: {
              uploadKey,
              assetUrl: imageUrl,
              timestamp: (new Date).getTime()
            }
          })
        })
        reader.readAsDataURL(file)
      }
    }
  }
)

