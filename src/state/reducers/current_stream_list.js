const initialState = {
  streams: null
}

const currentStreamList = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {

    case 'SET_SELECTED_FILTER': {
      const { selectedFilter } = payload
      return {
        ...state,
        selectedFilter,
        streams: null
      }
    }

    case 'EXIT_STREAM_LIST': {
      return {
        ...state,
        streams: null
      }
    }

    case 'FETCH_STREAM_LIST_FULFILLED': {
      const { streams } = payload
      return {
        ...state,
        streams
      }
    }

    case 'DELETE_STREAM_FULFILLED': {
      const { streamId } = payload
      const { streams } = state
      return {
        ...state,
        streams: streams.reduce((result, stream) => {
          if(streamId !== stream.id) {
            result.push(stream)
          }
          return result
        },[])
      }
    }

    default:
      return state
  }
}

export default currentStreamList
