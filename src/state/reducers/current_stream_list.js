const initialState = {
  streams: null
}

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

    default:
      return state
  }
}

export default currentStreamList
