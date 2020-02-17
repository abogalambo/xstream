const initialState = null

const currentStreamList = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {

    case 'FETCH_STREAM_LIST_FULFILLED': {
      const { streams } = payload
      return {
        ...initialState,
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
