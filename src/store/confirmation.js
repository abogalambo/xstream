const confirmation = () => next => action => {
  let result;

  const { isConfirmationNeeded, ...restOfPayload } = (action.payload || {})

  if(isConfirmationNeeded) {
    const newAction = {
      type: 'SHOW_CONFIRMATION_DIALOG',
      payload: {
        action: {
          ...action,
          payload: restOfPayload
        }
      }
    }

    result = next(newAction)

  } else {
    result = next(action)
  }

  return result
}

export default confirmation
