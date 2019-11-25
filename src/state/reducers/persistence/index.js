const initialState = {
  lastUpdateAt: null,
  lastRequestTriggeredAt: null,
  lastRequestStatus: null // 'success' | 'failure' | 'pending'
}

const updateObject = (oldObject, newValues) => Object.assign({}, oldObject, newValues)

const persistenceReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'ADD_IMAGE':
    case 'ADD_SEGMENT':
    case 'REMOVE_SEGMENT':
    case 'REMOVE_IMAGE':
    case 'SET_IMAGE_CAPTION':
    case 'SET_SEGMENT_TEXT':
    case 'STOP_RECORDING':
    case 'REMOVE_RECORDING':
    case 'NEW_STREAM':
    case 'SET_STREAM_TITLE':
    case 'ADD_COVER_IMAGE':
    case 'REMOVE_COVER_IMAGE': {
      return updateObject(state, {lastUpdateAt: payload.timestamp})
    }
    default:
      return state
  }
}

export default persistenceReducer
