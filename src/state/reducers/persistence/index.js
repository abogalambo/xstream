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

    case 'SAVE_STREAM_PENDING': {
      return updateObject(state, {
        lastRequestTriggeredAt: payload.timestamp,
        lastRequestStatus: 'pending'
      })
    }

    case 'SAVE_STREAM_FULFILLED': {
      return updateObject(state, {
        lastRequestStatus: 'success'
      })
    }

    case 'SAVE_STREAM_REJECTED': {
      return updateObject(state, {
        lastRequestStatus: 'failure'
      })
    }

    default:
      return state
  }
}

export default persistenceReducer
