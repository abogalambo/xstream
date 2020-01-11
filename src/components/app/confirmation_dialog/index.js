import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { confirmAction, cancelAction } from '../../../state/actions/confirmation'

const ConfirmationDialog = () => {
  const { message, action } = useSelector((state) => state.confirmation)

  const dispatch = useDispatch()
  const handleConfirm = () => {
    dispatch(confirmAction())
    dispatch(action)
  }

  return action ? (
    <div>
      <p>{message}</p>
      <button onClick={handleConfirm}>
        Yes
      </button>
      <button onClick={() => dispatch(cancelAction())}>
        No
      </button>
    </div>
  ) : null
}

export default ConfirmationDialog
