const initialState = {}

const confirmationReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'SHOW_CONFIRMATION_DIALOG': {
      return payload
    }

    case 'CONFIRM_ACTION':
    case 'CANCEL_ACTION': {
      return initialState
    }

    default:
      return state
  }
}

export default confirmationReducer
