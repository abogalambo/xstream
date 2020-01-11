const confirmation = store => next => action => {
  let result;

  const { confirm, ...restOfPayload } = (action.payload || {})

  if(confirm) {
    const newAction = {
      type: 'SHOW_CONFIRMATION_DIALOG',
      payload: {
        message: confirm,
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
