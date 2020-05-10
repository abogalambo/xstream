const initialState = {
  lastUpdateAt: null,
  lastRequestTriggeredAt: null,
  lastRequestStatus: null, // 'success' | 'failure' | 'pending'
  isTimeoutSet: false
}

const updateObject = (oldObject, newValues) => Object.assign({}, oldObject, newValues)

const persistenceReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'REMOVE_SEGMENT':
    case 'REORDER_SEGMENTS':
    case 'REMOVE_IMAGE':
    case 'SET_IMAGE_CAPTION':
    case 'SET_IMAGE_STYLE':
    case 'SET_SEGMENT_TEXT':
    case 'SET_SEGMENT_SCRIPT':
    case 'REMOVE_RECORDING':
    case 'NEW_STREAM':
    case 'SET_STREAM_TITLE':
    case 'STREAM_ASSET_UPLOADED':
    case 'REMOVE_COVER_IMAGE': {
      return updateObject(state, {lastUpdateAt: payload.timestamp})
    }

    case 'EXIT_STREAM': {
      return initialState
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

    case 'SAVE_STREAM_LATER_PENDING': {
      return updateObject(state, {
        isTimeoutSet: true
      })
    }

    case 'SAVE_STREAM_LATER_REJECTED':
    case 'SAVE_STREAM_LATER_FULFILLED': {
      return updateObject(state, {
        isTimeoutSet: false
      })
    }

    default:
      return state
  }
}

export default persistenceReducer
