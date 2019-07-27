const updateObject = (oldObject, newValues) => Object.assign({}, oldObject, newValues)

const segmentReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {

    case 'SET_SEGMENT_TEXT': {
      return updateObject(state, {
        text: payload.text
      })
    }

    default:
      return state
  }
}

export default segmentReducer
