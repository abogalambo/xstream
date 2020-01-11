import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { confirmAction, cancelAction } from '../../../state/actions/confirmation'
import textResources from './text_resources'

const ConfirmationDialog = () => {
  const { action } = useSelector((state) => state.confirmation)

  const dispatch = useDispatch()
  const handleConfirm = () => {
    dispatch(confirmAction())
    dispatch(action)
  }

  if(!action) {
    return null
  }

  const {
    prompt: defaultPrompt,
    confirmText: defaultConfirmText,
    cancelText: defaultCancelText
  } = textResources.DEFAULT

  const {
    prompt = defaultPrompt,
    confirmText = defaultConfirmText,
    cancelText = defaultCancelText
  } = textResources[action.type] || {}

  return (
    <div>
      <p>{prompt}</p>
      <button onClick={handleConfirm}>
        {confirmText}
      </button>
      <button onClick={() => dispatch(cancelAction())}>
        {cancelText}
      </button>
    </div>
  )
}

export default ConfirmationDialog
