import MediaManager from '../../lib/media_manager'

export const addImageActionCreator = (type) => (
  (event, uploadKey) => {
    return dispatch => {
      const file = event.target.files[0]
      const reader = new FileReader()

      reader.addEventListener("load", () => {
        dispatch({
          type,
          payload: {
            src: reader.result,
            mediaKey: uploadKey
          }
        })
      }, false);

      if (file) {
        (new MediaManager()).write(uploadKey, file).then(imageUrl => {
          dispatch({
            type: 'ASSET_UPLOADED',
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

