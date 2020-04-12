const confirmation = () => next => action => {
  let result;

  const { isConfirmationNeeded, promiseFunction, ...restOfPayload } = (action.payload || {})

  if(isConfirmationNeeded) {
    const newAction = {
      type: 'SHOW_CONFIRMATION_DIALOG',
      payload: {
        action: {
          ...action,
          payload: {
            ...restOfPayload,
            promiseFunction
          }
        }
      }
    }

    result = next(newAction)

  } else if(promiseFunction) {
    const newAction = {
      ...action,
      payload: {
        restOfPayload,
        promise: promiseFunction()
      }
    }

    result = next(newAction)
  } else {
    result = next(action)
  }

  return result
}

export default confirmation
