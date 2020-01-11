import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { confirmAction, cancelAction } from '../../../state/actions/confirmation'
import textResources from './text_resources'
import styles from './confirmation_dialog.css'

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
    <div className={styles.scrim}>
      <div className={styles.container}>
        <p className={styles.prompt}>{prompt}</p>
        <div className={styles.footer}>
          <button onClick={handleConfirm}>
            {confirmText}
          </button>
          <button onClick={() => dispatch(cancelAction())}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationDialog
