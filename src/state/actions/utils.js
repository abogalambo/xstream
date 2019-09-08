export const addImageActionCreator = (type) => (
  (e) => {
    return dispatch => {
      const file = e.target.files[0]
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        dispatch({
          type,
          payload: { src: reader.result }
        })
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    }  
  }
)
